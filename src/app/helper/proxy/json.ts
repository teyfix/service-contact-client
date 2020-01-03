import { Verbose } from '../verbose';

export const JsonProxy = <T extends object>(
  target: T,
  // for JSON.parse
  reviver?: (this: any, key: string, value: any) => any,
  // for JSON.stringify
  replacer?: (this: any, key: string, value: any) => any,
  space?: string | number
) => {
  return new Proxy(target, {
    get(t, p) {
      try {
        return JSON.parse(t[p], reviver);
      } catch (e) {
        if (e instanceof SyntaxError) {
          Verbose.error(e);
          return null;
        }

        throw e;
      }
    },
    set(t, p, v) {
      try {
        t[p] = JSON.stringify(v, replacer, space);
      } catch (e) {
        if (e instanceof TypeError) {
          Verbose.error(e);

          return false;
        }

        throw e;
      }

      return true;
    }
  });
};
