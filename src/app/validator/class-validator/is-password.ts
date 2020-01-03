import { IsString, Matches, MinLength } from 'class-validator';
import * as XRegExp from 'xregexp';

const isString = IsString();
const minLength = MinLength(6);
const matches = Matches(
  XRegExp('^(?=.*[\\pL])(?=.*[0-9])(?=.*[^\\pL0-9]).{6,}$'),
  {message: '$property must contain letter, number and symbol'}
);

export const IsPassword = (): PropertyDecorator => {
  return (target, key) => {
    if ('string' === typeof key) {
      isString(target, key);
      minLength(target, key);
      matches(target, key);
    } else {
      throw new TypeError('Symbol property keys are not supported');
    }
  };
};
