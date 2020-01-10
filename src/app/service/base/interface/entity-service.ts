import { HttpClient } from '@angular/common/http';
import { IHttpClient } from 'src/app/service/base/interface/http-client';
import { BaseEntity } from 'src/app/service/base/entity/base.entity';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface EntityService<T extends BaseEntity = BaseEntity> extends IHttpClient {
}

@Injectable({
  providedIn: 'root',
})
export class EntityService<T extends BaseEntity = BaseEntity> {
  entity: new () => T;
  prefix: string;
  modified = new Subject<void | unknown>();

  constructor(private readonly httpClient: HttpClient) {
    ['delete', 'get', 'head', 'jsonp', 'options', 'patch', 'post', 'put', 'request'].forEach(method => {
      this[method] = function(this: EntityService) {
        const args = Array.from(arguments);

        args[0] = [this.prefix, args[0]].join('/');

        return this.httpClient[method].apply(this.httpClient, args);
      };
    });
  }
}
