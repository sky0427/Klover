import {create} from 'zustand';
import * as RNLocalize from 'react-native-localize';
import i18n from '../utils/i18n';

type LanguageCode = 'en' | 'ja' | 'ko' | 'zh';
type FontWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

interface LanguageState {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  getFontFamily: (language: LanguageCode, fontWeight: FontWeight) => void;
}

const getInitialLanguage = (): LanguageCode => {
  const locales = RNLocalize.getLocales();
  if (locales.length > 0) {
    const primaryLanguage = locales[0].languageCode as LanguageCode;
    if (['en', 'ja', 'ko', 'zh'].includes(primaryLanguage)) {
      return primaryLanguage;
    }
  }
  return 'en';
};

const getFontFamilyByLanguage = (
  language: LanguageCode,
  fontWeight: FontWeight,
): string => {
  const baseFontName = (() => {
    switch (language) {
      case 'en':
        return 'NotoSansEN';
      case 'ja':
        return 'NotoSansJP';
      case 'ko':
        return 'NotoSansKR';
      case 'zh':
        return 'NotoSansSC';
      default:
        return 'NotoSansEN';
    }
  })();

  const weightSuffix = (() => {
    switch (fontWeight) {
      case 'light':
        return 'Light';
      case 'regular':
        return 'Regular';
      case 'medium':
        return 'Medium';
      case 'semibold':
        return 'SemiBold';
      case 'bold':
        return 'Bold';
      default:
        return 'Regular';
    }
  })();

  return `${baseFontName}-${weightSuffix}`;
};

const useLanguageStore = create<LanguageState>(set => ({
  language: getInitialLanguage(),
  setLanguage: language => {
    set({language});
    i18n.changeLanguage(language);
  },
  getFontFamily: getFontFamilyByLanguage,
}));

export default useLanguageStore;
