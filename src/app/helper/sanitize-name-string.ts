import * as XRegExp from 'xregexp';

export const sanitizeNameString = (input: string) => {
  return (
    input
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase()
      .replace(XRegExp('(?:^|[^\\p{Latin}])\\p{Latin}', 'g'), m => m.toLocaleUpperCase())
  );
};
