import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

const getDeviceLanguage = (): string => {
  const locales = RNLocalize.getLocales();
  if (locales.length > 0) {
    const primaryLanguage = locales[0].languageCode?.toLowerCase();
    if (['en', 'ja', 'ko', 'zh'].includes(primaryLanguage)) {
      return primaryLanguage;
    }
  }
  return 'en';
};

console.log('Detected language: ', getDeviceLanguage);

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  fallbackLng: 'en',
  lng: getDeviceLanguage(),
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  resources: {
    en: {
      translation: require('../locales/en/translation.json'),
    },
    ja: {
      translation: require('../locales/ja/translation.json'),
    },
    ko: {
      translation: require('../locales/ko/translation.json'),
    },
    zh: {
      translation: require('../locales/zh/translation.json'),
    },
  },
});

export default i18n;
