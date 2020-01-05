import { Observable, Subscriber, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';
import { transformAndValidate } from 'src/helper/transform-and-validate';
import { pluck, tap } from 'rxjs/operators';

interface PaginatorResponse {
  data: object[];
  count: number;
}

export class Paginator<T> extends Observable<T[]> {
  page = 1;
  count = 0;
  limit = 10;

  private readonly subscribers = new Set<Subscriber<T[]>>();
  private subscription: Subscription;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly endpoint: string,
    private readonly type: new() => T,
  ) {
    super(subscriber => this.addSubscriber(subscriber));

    this.endpoint = endpoint.replace(/\\+$/, '') + '/paginate';
  }

  get last() {
    return Math.max(1, Math.ceil(this.count / this.limit));
  }

  get pending() {
    return !!this.subscription;
  }

  get canGoForward() {
    return this.page < this.last;
  }

  get canGoBackward() {
    return this.page > 1;
  }

  next() {
    if (this.page < this.last) {
      this.page++;
      this.reload();
    }

    return this;
  }

  prev() {
    if (this.page > 1) {
      this.page--;
      this.reload();
    }

    return this;
  }

  reload() {
    this.clear();
    this.subscription = this.request().pipe(
      transformAndValidate(this.type),
    ).subscribe(data => {
      this.clear();
      this.publish(data);
    }, error => {
      this.clear();
      this.publishError(error);
    });
  }

  private publish(data: T[]) {
    this.subscribers.forEach(s => s.next(data));
  }

  private publishError(error) {
    this.subscribers.forEach(s => s.error(error));
  }

  private request() {
    return this.httpClient.get<PaginatorResponse>(this.endpoint, {params: this.params()}).pipe(
      tap(({count}) => this.count = count),
      pluck('data'),
    );
  }

  private params() {
    const params: Params = {limit: this.limit};

    if (this.page > 1) {
      params.skip = (this.page - 1) * this.limit;
    }

    return params;
  }

  private clear() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  private addSubscriber(subscriber: Subscriber<T[]>) {
    this.subscribers.add(subscriber);
    this.check();

    return () => {
      this.subscribers.delete(subscriber);
      this.check();
    };
  }

  private check() {
    if (this.subscribers.size > 0) {
      this.reload();
    } else {
      this.clear();
    }
  }
}
