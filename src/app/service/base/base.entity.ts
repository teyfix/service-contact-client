import { IsDate, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

export class BaseEntity {
  @IsMongoId()
  _id: string;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @Type(() => Date)
  updatedAt: Date;
}
