import { format } from "date-fns";
export const stringToDate = (string: string) => {
  return Date.parse(string) ? format(new Date(string), "dd MMM yyyy") : "";
};
