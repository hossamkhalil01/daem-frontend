import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
import translationAR from "./assets/translations/ar/translation.json";
import translationEN from "./assets/translations/en/translation.json";

const fallbackLng = ["en"];
const availableLanguages = ["en", "ar"];

const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng,
    detection: {
      checkWhitelist: true,
    },
    debug: false,
    whitelist: availableLanguages,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
