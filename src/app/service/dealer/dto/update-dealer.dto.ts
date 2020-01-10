import { CreateDealerDto } from 'src/app/service/dealer/dto/create-dealer.dto';
import { IsOptional } from 'class-validator';

export class UpdateDealerDto extends CreateDealerDto {
  @IsOptional()
  title: string;

  @IsOptional()
  city: string;

  @IsOptional()
  phone: string;
}
