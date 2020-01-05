const generateMiddleware = (prefix: string) => {
  return <T>(p: string | number | symbol, defaultValue: T, callback: (p: string) => T) => {
    if ('number' === typeof p) {
      p = String(p);
    }

    if ('string' === typeof p) {
      p = prefix + '[' + p + ']';

      return callback(p);
    }

    return defaultValue;
  };
};

export const PrefixProxy = <T extends object>(proxyTarget: T, prefix: string) => {
  const middleware = generateMiddleware(prefix);
  const clearPrefix = (p: string) => p.substring(prefix.length + 1, p.length - 1);

  return new Proxy(proxyTarget, {
    getOwnPropertyDescriptor(target: T, p: string | number | symbol): PropertyDescriptor | undefined {
      return middleware(p, null, rp => Object.getOwnPropertyDescriptor(target, rp));
    },
    defineProperty(target: T, p: string | number | symbol, attributes: PropertyDescriptor): boolean {
      return middleware(p, target, pr => Object.defineProperty(target, pr, attributes));
    },
    has(target: T, p: string | number | symbol): boolean {
      return middleware(p, false, rp => rp in target);
    },
    get(target: T, p: string | number | symbol, receiver: any): any {
      return middleware(p, null, rp => target[rp]);
    },
    set(target: T, p: string | number | symbol, value: any, receiver: any): boolean {
      return middleware(p, false, rp => (target[rp] = value, true));
    },
    deleteProperty(target: T, p: string | number | symbol): boolean {
      return middleware(p, false, rp => delete target[rp]);
    },
    ownKeys(target: T): PropertyKey[] {
      return Reflect.ownKeys(target).map(key => {
        if ('string' === typeof key) {
          return clearPrefix(key);
        }

        return key;
      });
    },
  });
};
