import { merge, Observable, of, Subject, Subscriber, Subscription } from 'rxjs';
import { Params } from '@angular/router';
import { catchError, debounceTime, pluck, switchMap, tap } from 'rxjs/operators';
import { transformAndValidate } from 'src/helper/transform-and-validate';
import { ToJson } from 'src/app/interface/to-json';
import { EntityService } from 'src/app/service/base/interface/entity-service';
import { BaseEntity } from 'src/app/service/base/entity/base.entity';

interface PaginatorResponse {
  data: object[];
  count: number;
}

export class Paginator<T extends BaseEntity> extends Observable<T[]> implements ToJson {
  data: T[];
  limit = 10;
  pending = false;

  total = 0;
  canPrev = false;
  canNext = false;
  lastPage = 1;
  currentPage = 1;

  private subject = new Subject<void>();
  private subscription: Subscription;
  private readonly subscribers = new Set<Subscriber<T[]>>();

  constructor(private readonly service: EntityService) {
    super(subscriber => this.addSubscriber(subscriber));
  }

  static create<E extends BaseEntity, S extends EntityService<E>>(service: S) {
    return new Paginator<E>(service);
  }

  goto(page: number) {
    page = Math.max(1, Math.min(page, this.lastPage));

    if (this.currentPage !== page) {
      this.currentPage = page;
      this.subject.next();
    }

    return this;
  }

  first() {
    return this.goto(1);
  }

  prev() {
    return this.goto(this.currentPage - 1);
  }

  next() {
    return this.goto(this.currentPage + 1);
  }

  last() {
    return this.goto(this.lastPage);
  }

  toJSON() {
    return {
      // data: this.data,
      page: this.currentPage,
      count: this.total,
      limit: this.limit,
      pending: this.pending,
    };
  }

  private params() {
    const params: Params = {limit: this.limit};

    if (this.currentPage > 1) {
      params.skip = (this.currentPage - 1) * this.limit;
    }

    return params;
  }

  private request() {
    return this.service.get<PaginatorResponse>('paginate', {params: this.params()});
  }

  private generateSource() {
    return merge(this.subject, this.service.modified).pipe(
      debounceTime(200),
      tap(() => this.pending = true),
      switchMap(() => this.request()),
      tap(_ => {
        this.total = _.count;
        this.lastPage = Math.max(1, Math.ceil(_.count / this.limit));
        this.canPrev = this.currentPage > 1;
        this.canNext = this.currentPage < this.lastPage;

        if (_.data.length === 0 && _.count > 0) {
          this.currentPage = this.lastPage;
          this.subject.next();
        }
      }),
      pluck('data'),
      transformAndValidate<object[], T[]>(this.service.entity),
    );
  }

  private clear() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  private check() {
    if (this.subscribers.size > 0) {
      if (this.subscription) {
        return;
      }

      this.subscription = this.generateSource().pipe(
        tap(data => this.publish(data)),
        catchError(error => (this.publishError(error), of(null))),
      ).subscribe(() => {
        this.pending = false;
      });
      this.subject.next();
    } else {
      this.clear();
    }
  }

  private publish(data: T[]) {
    this.data = data;
    this.subscribers.forEach(s => s.next(data));
  }

  private publishError(error) {
    this.subscribers.forEach(s => s.error(error));
  }

  private addSubscriber(subscriber: Subscriber<T[]>) {
    this.subscribers.add(subscriber);
    this.check();

    return () => {
      this.subscribers.delete(subscriber);
      this.check();
    };
  }
}
