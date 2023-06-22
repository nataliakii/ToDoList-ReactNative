import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationsEn from './en.json';
import translationsUa from './el.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: translationsEn,
    },
    ua: {
      translation: translationsUa,
    },
  },
});

export default i18n;
