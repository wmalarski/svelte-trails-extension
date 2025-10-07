import { addMessages, getLocaleFromNavigator, init } from "svelte-i18n";

import pl from "./locales/pl.json";

export const DEFAULT_LOCALE = "pl";

addMessages(DEFAULT_LOCALE, pl);

init({
  fallbackLocale: DEFAULT_LOCALE,
  initialLocale: getLocaleFromNavigator(),
});
