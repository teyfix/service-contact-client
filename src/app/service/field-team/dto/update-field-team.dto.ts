import { CreateFieldTeamDto } from 'src/app/service/field-team/dto/create-field-team.dto';
import { IsOptional } from 'class-validator';
import { City } from 'src/app/service/location/entity/city';

export class UpdateFieldTeamDto extends CreateFieldTeamDto {
  @IsOptional()
  title: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  city: City;
}
