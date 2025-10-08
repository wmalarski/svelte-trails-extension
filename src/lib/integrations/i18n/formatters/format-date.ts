import { DEFAULT_LOCALE } from "../constants";

export const formatDate = (
  date: Date | number | string,
  locale?: string | null
) => {
  const localeValue = locale ?? DEFAULT_LOCALE;

  const formatter = new Intl.DateTimeFormat(localeValue, {
    dateStyle: "full",
  });

  try {
    const formatted = formatter.format(new Date(date));

    return formatted;
  } catch {
    return JSON.stringify(date, null, 2);
  }
};
