import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export const transform = <T>(type: new () => T) => map(data => plainToClass(type, data));
