export const stringToDate = (string: string) => {
  return Date.parse(string) ? new Date(string).toLocaleDateString() : "";
};
