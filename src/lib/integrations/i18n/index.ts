import { addMessages, getLocaleFromNavigator, init } from "svelte-i18n";
import { DEFAULT_LOCALE } from "./constants";
import pl from "./locales/pl.json";

addMessages(DEFAULT_LOCALE, pl);

init({
  fallbackLocale: DEFAULT_LOCALE,
  initialLocale: getLocaleFromNavigator(),
});
