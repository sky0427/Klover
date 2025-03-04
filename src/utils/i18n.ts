import * as RNLocalize from 'react-native-localize';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import resourcesToBackend from 'i18next-resources-to-backend';

const getDeviceLanguage = (): string => {
  const locales = RNLocalize.getLocales();
  if (locales.length > 0) {
    const primaryLanguage = locales[0].languageCode;
    if (['en', 'ja', 'ko', 'zh'].includes(primaryLanguage)) {
      return primaryLanguage;
    }
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  // .use(HttpApi)
  // .use(
  //   resourcesToBackend(
  //     (language: string, namespace: string) =>
  //       import(`../locales/${language}/translation.json`),
  //   ),
  // )
  .init({
    compatibilityJSON: 'v4',
    fallbackLng: 'en',
    lng: getDeviceLanguage(),
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    // backend: {
    //   loadPath: '../locales/{{lng}}/{{ns}}.json',
    // },
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
