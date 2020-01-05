import { validate$ } from 'src/helper/validate';
import { transform } from 'src/helper/transform';
import { OperatorFunction } from 'rxjs';

export const transformAndValidate = <T, U>(type): OperatorFunction<T, U> => {
  return source => source.pipe(transform(type), validate$());
};
