export const slugify = (str: string) => {
  return str
    .normalize('NFD') // split accented letters into the base letter and the accent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .trim()
    .replace(/[-\s]+/g, '-') // separator
    .replace(/^-+/, '') // trim - from start of text
    .replace(/-+$/, '');
};
