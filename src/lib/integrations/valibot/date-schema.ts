import * as v from "valibot";

export const dateToInputValue = (date: Date) => {
  return date.toJSON().split("T")[0];
};

export const dateSchema = v.pipe(v.date(), v.transform(dateToInputValue));
