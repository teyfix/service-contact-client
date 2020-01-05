import { IsMongoId } from 'class-validator';
import { classToValidator } from 'src/validator/form-validator/class-to-validator';

class MongoIdValidation {
  @IsMongoId()
  value: string;
}

export const mongoIdValidator = classToValidator(MongoIdValidation, 'mongoId', '_id');
