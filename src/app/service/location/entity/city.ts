import { IsNumberString } from 'class-validator';
import { TitleEntity } from 'src/app/service/base/entity/title.entity';


export class City extends TitleEntity {
  @IsNumberString()
  code: string;

  static sort(a, b, text: string) {
    if (/^\d+$/.test(text)) {
      // @ts-ignore
      return a.code.startsWith(text) - b.code.startsWith(text) || b.code - a.code;
    }

    return TitleEntity.sort(a, b, text);
  }

  static compare(city, input: string) {
    return city.code.includes(input) || TitleEntity.compare(city, input);
  }
}
