import I18n from 'react-native-i18n';

import en from './locales/en.json';
import ua from './locales/ua.json';

I18n.translations = {
  en,
  ua,
};

I18n.defaultLocale = 'en';

export default I18n;
