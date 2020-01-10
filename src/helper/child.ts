export const child = (obj, path: string | string[]) => {
  if ('string' === typeof path) {
    path = path.split('.');
  }

  for (let i = 0; obj && i < path.length; i++) {
    obj = obj [path[i]];
  }

  return obj;
};
