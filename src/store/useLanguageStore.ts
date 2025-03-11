import {create} from 'zustand';
import * as RNLocalize from 'react-native-localize';
import i18n from '../utils/i18n';
import {Country} from '@/types';

type LanguageCode = 'en' | 'ja' | 'ko' | 'zh';
type FontWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

interface LanguageState {
  language: Country;
  setLanguage: (language: Country) => void;
  getFontFamily: (language: Country, fontWeight: FontWeight) => void;
}

const getInitialLanguage = (): Country => {
  const locales = RNLocalize.getLocales();
  if (locales.length > 0) {
    const primaryLanguage = locales[0].languageCode as Country;
    if (['EN', 'JA', 'KO', 'ZH'].includes(primaryLanguage)) {
      return primaryLanguage;
    }
  }
  return Country.EN;
};

const getFontFamilyByLanguage = (
  language: Country,
  fontWeight: FontWeight,
): string => {
  const baseFontName = (() => {
    switch (language) {
      case 'EN':
        return 'NotoSansEN';
      case 'JA':
        return 'NotoSansJP';
      case 'KO':
        return 'NotoSansKR';
      case 'ZH':
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
