import { IsBoolean } from 'class-validator';


export class AuhtGuardData {
  @IsBoolean()
  shouldAuthorized: boolean;
}
