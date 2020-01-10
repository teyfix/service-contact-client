import { fromValidate } from 'src/helper/from-validate';
import { FindByIdDto } from 'src/app/service/base/dto/find-by-id.dto';
import { debounceTime, map, share, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { transformAndValidate } from 'src/helper/transform-and-validate';
import { combineLatest, Observable, OperatorFunction } from 'rxjs';
import { BaseEntity } from 'src/app/service/base/entity/base.entity';
import { Paginator } from 'src/app/service/paginate/paginator';
import { child } from 'src/helper/child';
import { EntityService } from 'src/app/service/base/interface/entity-service';

const itemsSymbol = Symbol();

/**
 * WARNING
 *
 * Extending this class without passing constructor parameters with a super() call
 * results with a static injection error.
 *
 */
export class BaseService<T extends BaseEntity> extends EntityService<T> {
  CreateDto;
  UpdateDto;

  get items(): Observable<T[]> {
    if (!this[itemsSymbol]) {
      this[itemsSymbol] = this.modified.pipe(
        startWith(null),
        switchMap(() => this.get('')),
        transformAndValidate(this.entity),
        shareReplay(1),
      );
    }

    return this[itemsSymbol];
  }

  findById(_id: string) {
    return fromValidate(FindByIdDto, {_id}).pipe(
      switchMap(payload => this.get(payload._id)),
      transformAndValidate(this.entity),
      share(),
    ) as Observable<T>;
  }

  create(data) {
    return fromValidate(this.CreateDto, data).pipe(
      switchMap(body => this.post('', body)),
      transformAndValidate(this.entity),
      tap(() => this.modified.next()),
      share(),
    ) as Observable<T>;
  }

  update(id: string, payload) {
    return fromValidate(this.UpdateDto, payload).pipe(
      switchMap(body => this.patch(id, body)),
      transformAndValidate(this.entity),
      tap(() => this.modified.next()),
    ) as Observable<T>;
  }

  deleteById(_id: string | string[]) {
    if (_id instanceof Array) {
      return Promise.all(_id.map(_id$ => this.deleteById(_id$)));
    }

    return fromValidate(FindByIdDto, {_id}).pipe(
      switchMap(body => this.delete(body._id)),
      transformAndValidate(this.entity),
      tap(() => this.modified.next()),
    ).toPromise();
  }

  deleteBatch(_id: string[]) {
    return Promise.all(_id.map(id => this.deleteById(id)));
  }

  paginate(): Paginator<T> {
    return Paginator.create(this);
  }

  typeahead(
    field: string | ((item: T, input: string) => boolean),
    sort?: string | ((a: T, b: T, input: string) => number),
    slice = 10,
  ): OperatorFunction<string, T[]> {
    return (input: Observable<string>) => {
      return combineLatest(
        this.items,
        input.pipe(
          debounceTime(50),
          map(text => text.toLocaleLowerCase()),
        ),
      ).pipe(
        map(([items, text]) => {
          items = items.filter(item => {
            if ('function' === typeof field) {
              return field(item, text);
            } else {
              return child(item, field).toLocaleLowerCase().includes(text);
            }
          });

          if ('function' === typeof sort) {
            items = items.sort((a, b) => sort(a, b, text));
          }

          if ('string' === typeof sort) {
            items = items.sort((a, b) => {
              const c = child(a, sort);
              const d = child(b, sort);

              if ('string' === typeof c && 'string' === typeof d) {
                return c.localeCompare(d);
              }

              return c - d;
            });
          }

          if ('number' === typeof slice) {
            items = items.slice(0, slice);
          }

          return items;
        }),
      );
    };
  }
}
