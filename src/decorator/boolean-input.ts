import { Input } from '@angular/core';

function parseInput(input) {
  switch (input) {
    case 1:
    case 'true':
      return true;

    case 0:
    case 'false':
      return false;
  }

  return input !== false;
}

export const BooleanInput = (bindingPropertyName?: string): PropertyDecorator => {
  return (target, propertyKey) => {
    const privateSymbol = Symbol('BooleanInput[' + String(propertyKey) + ']');

    Object.defineProperty(target, propertyKey, {
      set(input) {
        target[privateSymbol] = parseInput(input);
      },
      get() {
        return target[privateSymbol];
      },
    });

    Input(bindingPropertyName)(target, propertyKey);
  };
};
