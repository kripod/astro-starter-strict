import { defaultLang, TranslationObject, ui } from "./ui";

export type Lang = keyof typeof ui;

export type DefaultLang = typeof defaultLang;

export type TranslationsFunction = (
  key: keyof TranslationObject[DefaultLang],
) => string;

export type UseTranslationsFunction = (lang: Lang) => TranslationsFunction;

export const getLangFromUrl = (
  url: URL,
): {
  lang: keyof typeof ui;
  prefix: string;
} => {
  const [, language] = url.pathname.split("/");

  const lang = language in ui ? (language as keyof typeof ui) : defaultLang;

  return {
    lang,
    prefix: lang === "en" ? "/" : `/${lang}/`,
  };
};

export const useTranslations = (
  lang: Lang,
): ((key: keyof TranslationObject[DefaultLang]) => string) =>
  function t(key: keyof TranslationObject[DefaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
