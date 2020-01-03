import { IsMongoId } from 'class-validator';
import { classToValidator } from './class-to-validator';

class MongoIdValidation {
  @IsMongoId()
  value: string;
}

export const mongoIdValidator = classToValidator(MongoIdValidation, 'mongoId');
