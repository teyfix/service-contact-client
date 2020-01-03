import { ValidationError } from 'class-validator';

export class ValidationErrors extends Error {
  constructor(public readonly errors: ValidationError[]) {
    super('Validation failed');
  }
}
