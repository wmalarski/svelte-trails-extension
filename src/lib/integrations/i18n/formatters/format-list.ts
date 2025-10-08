import { DEFAULT_LOCALE } from "../constants";

export const formatList = (values: string[], locale?: string | null) => {
  const localeValue = locale ?? DEFAULT_LOCALE;

  const formatter = new Intl.ListFormat(localeValue, {
    style: "long",
    type: "conjunction",
  });

  return formatter.format(values);
};
