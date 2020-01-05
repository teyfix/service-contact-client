import { environment } from 'src/environments/environment';
import { VerboseLevel } from 'src/constant/verbose-level';

export interface Methods {
  log(...message: any[]): void;

  info(...message: any[]): void;

  debug(...message: any[]): void;

  warn(...message: any[]): void;

  error(...message: any[]): void;
}

export const Verbose = new class {
  constructor() {
    Object.keys(VerboseLevel).filter(value => !/^\d+$/.test(value)).forEach((level) => {
      const low = level.toLowerCase();
      const method = console[low in console && 'function' === typeof console[low] ? low : 'log'];
      const value = (...message) => {
        if (environment.verboseLevel < VerboseLevel[level]) {
          return;
        }

        message.unshift(level + ':');

        return method.apply(null, message);
      };

      Object.defineProperty(this, low, {value});
    });
  }
} as Methods;
