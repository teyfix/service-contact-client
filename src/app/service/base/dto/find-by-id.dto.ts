import { IsMongoId } from 'class-validator';

export class FindByIdDto {
  @IsMongoId()
  _id: string;
}
