import { Observable, of } from 'rxjs';
import { transform } from './transform';
import { validate$ } from './validate';
import { catchError, filter } from 'rxjs/operators';
import { ValidationErrors } from './validation-errors';

const source = <T>(type: new () => T, data: object) => of(data).pipe(transform(type), validate$());
const DismissSymbol = Symbol();

export enum FailureBehaviour {
  Throw,
  Dismiss,
  MapTo,
  MapToNull
}

// @ts-ignore
export const catchValidate = <T>(mapValue: T = null) => catchError(error => {
  if (error instanceof ValidationErrors) {
    return of(mapValue);
  }

  throw error;
});

export function fromValidate<T>(
  type: new () => T,
  data: object,
  failureBehaviour?: FailureBehaviour.Throw
): Observable<T>;

export function fromValidate<T>(
  type: new () => T,
  data: object,
  failureBehaviour: FailureBehaviour.Dismiss
): Observable<T | never>;

export function fromValidate<T>(
  type: new () => T,
  data: object,
  failureBehaviour: FailureBehaviour.MapToNull
): Observable<T | null>;

export function fromValidate<T, U>(
  type: new () => T,
  data: object,
  failureBehaviour: FailureBehaviour.MapTo,
  mapValue: U
): Observable<T | U>;

export function fromValidate<T, U>(
  type: new () => T,
  data: object,
  failureBehaviour = FailureBehaviour.Throw,
  mapValue?: U
) {
  switch (failureBehaviour) {
    case FailureBehaviour.Throw:
      return source(type, data);

    case FailureBehaviour.Dismiss:
      return fromValidate(type, data, FailureBehaviour.MapTo, DismissSymbol).pipe(
        filter(value => value !== DismissSymbol)
      );

    case FailureBehaviour.MapTo:
      return source(type, data).pipe(catchValidate(mapValue));

    case FailureBehaviour.MapToNull:
      return fromValidate(type, data, FailureBehaviour.MapTo, null);

    default:
      throw new RangeError('Unknown FailureBehaviour');
  }
}
