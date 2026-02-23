export const normalizeFilter = <T>(value?: T | T[]): T[] => {
  console.log("??va", value);
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};
