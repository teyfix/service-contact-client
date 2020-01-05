import { Injectable } from '@angular/core';
import { Paginator } from 'src/app/service/paginate/paginator';
import { HttpClient } from '@angular/common/http';
import { Subscribable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {
  constructor(private readonly httpClient: HttpClient) {
  }

  paginate<T>(endpoint: string, type: new () => T, changeSubject?: Subscribable<any>) {
    return new Paginator(this.httpClient, endpoint, type, changeSubject);
  }
}
