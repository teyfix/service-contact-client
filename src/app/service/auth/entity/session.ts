import { IsString } from 'class-validator';

export class Session {
  @IsString()
  token: string;
}
