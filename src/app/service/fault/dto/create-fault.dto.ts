import { IsName } from 'src/validator/class-validator';

export class CreateFaultDto {
  @IsName()
  title: string;
}
