import { merge, Observable, of, Subject, Subscribable, Subscriber, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';
import { catchError, pluck, switchMap, tap, throttleTime } from 'rxjs/operators';
import { transformAndValidate } from 'src/helper/transform-and-validate';

interface PaginatorResponse {
  data: object[];
  count: number;
}

export class Paginator<T> extends Observable<T[]> {
  data: T[];
  page = 1;
  count = 0;
  limit = 10;
  pending = false;

  private subject = new Subject<void>();
  private subscription: Subscription;
  private readonly subscribers = new Set<Subscriber<T[]>>();

  constructor(
    private readonly httpClient: HttpClient,
    private readonly endpoint: string,
    private readonly type: new() => T,
    private readonly changeSubject?: Subscribable<any>,
  ) {
    super(subscriber => this.addSubscriber(subscriber));

    this.endpoint = endpoint.replace(/\\+$/, '') + '/paginate';
    this.changeSubject = this.changeSubject || of();
  }

  get last() {
    return Math.max(1, Math.ceil(this.count / this.limit));
  }

  next() {
    if (this.page < this.last) {
      this.page++;
      this.subject.next();
    }

    return this;
  }

  prev() {
    if (this.page > 1) {
      this.page--;
      this.subject.next();
    }

    return this;
  }

  private params() {
    const params: Params = {limit: this.limit};

    if (this.page > 1) {
      params.skip = (this.page - 1) * this.limit;
    }

    return params;
  }

  private request() {
    return this.httpClient.get<PaginatorResponse>(this.endpoint, {params: this.params()});
  }

  private generateSource() {
    return merge(this.subject, this.changeSubject).pipe(
      throttleTime(50),
      tap(() => this.pending = true),
      switchMap(() => this.request()),
      tap(_ => this.count = _.count),
      pluck('data'),
      transformAndValidate<object[], T[]>(this.type),
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
