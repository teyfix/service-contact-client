import { IsPhoneNumber } from 'class-validator';
import { environment } from '../../../environments/environment';

export const IsPhone = () => IsPhoneNumber(environment.phoneLocal);
