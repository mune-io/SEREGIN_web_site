import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from './languages/translation.en.json';
import translationBY from './languages/translation.by.json';
import translationPL from './languages/translation.pl.json';
import translationRU from './languages/translation.ru.json';

import translationUK from './languages/translation.uk.json';
import translationDE from './languages/translation.de.json';

const resources = {
  de: {
        translation: translationDE
      },
  en: {
    translation: translationEN
  },
  by: {
    translation: translationBY
  },
  pl: {
    translation: translationPL
  },
  ru: {
    translation: translationRU
  },

  uk: {
    translation: translationUK
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
