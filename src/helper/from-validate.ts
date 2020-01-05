import { Observable, of } from 'rxjs';
import { transform } from 'src/helper/transform';
import { validate$ } from 'src/helper/validate';

export function fromValidate<T, U extends object>(type: new () => T, data: U): Observable<T>;
export function fromValidate(type, data) {
  return of(data).pipe(
    transform(type),
    validate$(),
  );
}

//
// const source = <T>(type: new () => T, data: object) => of(data).pipe(
//   tap(virgin => console.log({virgin})),
//   transform(type),
//   tap(transformed => console.log({transformed})),
//   validate$(),
//   tap(validated => console.log({validated})),
// );
// const DismissSymbol = Symbol();
//
// export enum FailureBehaviour {
//   Throw,
//   Dismiss,
//   MapTo,
//   MapToNull,
// }
//
// // @ts-ignore
// export const catchValidate = <T>(mapValue: T = null) => catchError(error => {
//   if (error instanceof ValidationErrors) {
//     return of(mapValue);
//   }
//
//   throw error;
// });
//
// export function fromValidate<T>(
//   type: new () => T,
//   data: object,
//   failureBehaviour?: FailureBehaviour.Throw,
// ): Observable<T>;
//
// export function fromValidate<T>(
//   type: new () => T,
//   data: object,
//   failureBehaviour: FailureBehaviour.Dismiss,
// ): Observable<T | never>;
//
// export function fromValidate<T>(
//   type: new () => T,
//   data: object,
//   failureBehaviour: FailureBehaviour.MapToNull,
// ): Observable<T | null>;
//
// export function fromValidate<T, U>(
//   type: new () => T,
//   data: object,
//   failureBehaviour: FailureBehaviour.MapTo,
//   mapValue: U,
// ): Observable<T | U>;
//
// export function fromValidate<T, U>(
//   type: new () => T,
//   data: object,
//   failureBehaviour = FailureBehaviour.Throw,
//   mapValue?: U,
// ) {
//   switch (failureBehaviour) {
//     case FailureBehaviour.Throw:
//       return source(type, data);
//
//     case FailureBehaviour.Dismiss:
//       return fromValidate(type, data, FailureBehaviour.MapTo, DismissSymbol).pipe(
//         filter(value => value !== DismissSymbol),
//       );
//
//     case FailureBehaviour.MapTo:
//       return source(type, data).pipe(catchValidate(mapValue));
//
//     case FailureBehaviour.MapToNull:
//       return fromValidate(type, data, FailureBehaviour.MapTo, null);
//
//     default:
//       throw new RangeError('Unknown FailureBehaviour');
//   }
// }
