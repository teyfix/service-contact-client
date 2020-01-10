import { BaseEntity } from 'src/app/service/base/entity/base.entity';
import { IsName } from 'src/validator/class-validator';

const titleLowercase = Symbol();

export class TitleEntity extends BaseEntity {
  @IsName()
  title: string;

  get titleLowerCase(): string {
    if (this[titleLowercase] == null) {
      this[titleLowercase] = this.title.toLocaleLowerCase();
    }

    return this[titleLowercase];
  }

  static sort<T extends TitleEntity>(a: T, b: T, text: string) {
    if (text) {
      const [c, d] = [a.titleLowerCase, b.titleLowerCase];

      // @ts-ignore
      return d.startsWith(text) - c.startsWith(text) || c.localeCompare(d);
    }

    // @ts-ignore
    return a.titleLowerCase.localeCompare(b.titleLowerCase);
  }

  static compare<T extends TitleEntity>(entity: T, input: string) {
    return entity.titleLowerCase.includes(input);
  }

  toString() {
    return this.title;
  }
}
