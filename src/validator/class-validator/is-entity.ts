import { ValidateNested, ValidationOptions } from 'class-validator';
import { plainToClass, Transform } from 'class-transformer';
import { BaseEntity } from 'src/app/service/base/entity/base.entity';

export const IsEntity = <T extends BaseEntity>(type: new () => T, validationOptions?: ValidationOptions): PropertyDecorator => {
  return (target, propertyKey: string) => {
    const transform = Transform(data => plainToClass(type, data));
    const validateNested = ValidateNested(validationOptions);

    transform(target, propertyKey);
    validateNested(target, propertyKey);
  };
};
