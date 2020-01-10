const dispatchEvent = <T extends Storage>(target: T, key: string, oldValue: string | null, newValue: string | null) => {
  const $event = document.createEvent('StorageEvent');

  $event.initEvent('storage', false, false);

  Object.defineProperties($event, {
    key: {value: key, enumerable: true},
    oldValue: {value: null, enumerable: true},
    newValue: {value: newValue, enumerable: true},
    url: {value: window.location.href, enumerable: true},
    storageArea: {value: target, enumerable: true},
    returnValue: {value: true, enumerable: true},
    cancelBubble: {value: false, enumerable: true},
  });

  window.dispatchEvent($event);
};

export const StorageProxy = <T extends Storage>(target: T, dispatch = false) => {
  return new Proxy(target, {
    get(t, p) {
      if ('number' === typeof p) {
        p = String(p);
      }

      if ('string' === typeof p) {
        return t.getItem(p);
      }

      return null;
    },
    set(t, p, v) {
      if ('number' === typeof p) {
        p = String(p);
      }

      if ('string' === typeof p) {
        if (dispatch) {
          const oldValue = target[p];
          t.setItem(p, v);
          dispatchEvent(t, p, oldValue, v);
        } else {
          t.setItem(p, v);
        }

        return true;
      }

      return false;
    },
    deleteProperty(t: T, p: string | number | symbol): boolean {
      if ('number' === typeof p) {
        p = String(p);
      }

      if ('string' === typeof p) {
        if (dispatch) {
          const oldValue = target[p];
          t.removeItem(p);
          dispatchEvent(t, p, oldValue, null);
        } else {
          t.removeItem(p);
        }


        return true;
      }

      return false;
    },
  });
};
