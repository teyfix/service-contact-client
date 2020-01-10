import { IsString, Matches } from 'class-validator';
import * as XRegExp from 'xregexp';

const isString = IsString();

const message = '$property must contain only letters';
const matchesName = Matches(
  XRegExp('^\\p{Latin}+$'),
  {message},
);
const matchesNameWithSpaces = Matches(
  XRegExp('^\\p{Latin}+(?: \\p{Latin}+)*$'),
  {message: message + ' and spaces'},
);

export const IsName = (spaces = true): PropertyDecorator => {
  return (target, key) => {
    if ('string' === typeof key) {
      isString(target, key);

      if (spaces) {
        matchesNameWithSpaces(target, key);
      } else {
        matchesName(target, key);
      }
    } else {
      throw new TypeError('Symbol property keys are not supported');
    }
  };
};
