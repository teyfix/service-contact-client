import { BaseEntity } from '../../base/base.entity';
import { IsName } from 'src/validator/class-validator';
import { IsNumberString } from 'class-validator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const titleLowercase = Symbol();

export class City extends BaseEntity {
  @IsName()
  title: string;

  @IsNumberString()
  code: string;

  get titleLowerCase(): string {
    if (this[titleLowercase] == null) {
      this[titleLowercase] = this.title.toLocaleLowerCase();
    }

    return this[titleLowercase];
  }

  static sort(input?: string) {
    return (source: Observable<City[]>) => {
      return source.pipe(
        map(cities => {
          return cities.sort((a, b) => {
            if (input) {
              if (/^\d+$/.test(input)) {
                // @ts-ignore
                return a.code.startsWith(input) - b.code.startsWith(input) || b.code - a.code;
              } else {
                const [c, d] = [a.titleLowerCase, b.titleLowerCase];

                // @ts-ignore
                return d.startsWith(input) - c.startsWith(input) || c.localeCompare(d);
              }
            }

            // @ts-ignore
            return a.titleLowerCase.localeCompare(b.titleLowerCase) || b.code - a.code;
          });
        }),
      );
    };
  }

  static filter(input: string) {
    return (source: Observable<City[]>) => {
      return source.pipe(
        map(cities => {
          if (/^\d+$/.test(input)) {
            return cities.filter(city => city.code.includes(input));
          } else {
            return cities.filter(city => city.titleLowerCase.includes(input));
          }
        }),
      );
    };
  }

  toString() {
    return this.title;
  }
}
