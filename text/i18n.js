import { I18n } from 'i18n-js';
import en from './locales/en.json';
import ua from './locales/ua.json';

const i18n = new I18n({ en, ua });

i18n.defaultLocale = 'en';

export default i18n;
