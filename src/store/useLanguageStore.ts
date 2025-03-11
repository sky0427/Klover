import {Country} from '@/types';
import * as RNLocalize from 'react-native-localize';
import {create} from 'zustand';
import i18n from '../utils/i18n';

type FontWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

interface LanguageState {
  language: Country;
  setLanguage: (language: Country) => void;
  getFontFamily: (language: Country, fontWeight: FontWeight) => string;
}

const getInitialLanguage = (): Country => {
  const locales = RNLocalize.getLocales();
  if (locales.length > 0) {
    const primaryLanguage = locales[0].languageCode?.toUpperCase() as Country;
    if (Object.values(Country).includes(primaryLanguage)) {
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
      case Country.EN:
        return 'NotoSansEN';
      case Country.JA:
        return 'NotoSansJP';
      case Country.KO:
        return 'NotoSansKR';
      case Country.ZH:
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
    i18n.changeLanguage(language.toLowerCase()).then(() => {
      set({language});
    });
  },
  getFontFamily: getFontFamilyByLanguage,
}));

export default useLanguageStore;
