import { Injectable } from '@angular/core';
import { Paginator } from 'src/app/service/paginate/paginator';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {
  constructor(private readonly httpClient: HttpClient) {
  }

  paginate<T>(endpoint: string, type: new () => T) {
    return new Paginator(this.httpClient, endpoint, type);
  }
}
