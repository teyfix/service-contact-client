import { BaseEntity } from '../../base/base.entity';
import { IsName } from '../../../validator/class-validator/is-name';
import { IsNumberString } from 'class-validator';

export class City extends BaseEntity {
  @IsName()
  title: string;

  @IsNumberString()
  code: string;
}
