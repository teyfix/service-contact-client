import { IsPhoneNumber } from 'class-validator';
import { environment } from 'src/environments/environment';

export const IsPhone = () => IsPhoneNumber(environment.phoneLocal);
