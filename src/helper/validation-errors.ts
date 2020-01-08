import { ValidationError } from 'class-validator';
import { environment } from 'src/environments/environment.prod';

export class ValidationErrors extends Error {
  constructor(public readonly errors: ValidationError[]) {
    super(
      'Validation failed' + (
        environment.production
          ? ''
          : ': ' + JSON.stringify(errors, null, 2)
      ),
    );
  }
}
