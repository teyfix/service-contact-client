import { CreateFaultDto } from 'src/app/service/fault/dto/create-fault.dto';
import { IsOptional } from 'class-validator';

export class UpdateFaultDto extends CreateFaultDto {
  @IsOptional()
  title: string;
}
