import en from '../languages/en';
import ru from '../languages/ru';

export const LANGUAGE_DESCRIPTORS = { en, ru };
export type Language = keyof typeof LANGUAGE_DESCRIPTORS;

export const LANGUAGES = Object.keys(LANGUAGE_DESCRIPTORS) as Language[];
export const LANGUAGE_DEFAULT: Language = 'en';

export type LanguageDescriptor = (typeof LANGUAGE_DESCRIPTORS)[typeof LANGUAGE_DEFAULT];

export function getCurrentLanguage(url?: URL) {
  const languageStr = import.meta.env.DEV ? url?.searchParams.get('language') : import.meta.env.LANGUAGE;

  return validateLanguage(languageStr);
}

export function createTranslatedUrl(pathname: string, language: Language) {
  if (import.meta.env.DEV) {
    if (language === LANGUAGE_DEFAULT) {
      return pathname;
    }
    return `${pathname}?language=${language}`;
  } else {
    return `${LANGUAGE_DESCRIPTORS[language].site}${pathname}`;
  }
}

export function validateLanguage(value: string | undefined): Language {
  const valueStr = value?.trim().toLowerCase();
  return LANGUAGES.find((language) => language === valueStr) || LANGUAGE_DEFAULT;
}
