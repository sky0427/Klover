import {ThemeMode, ThemeState} from '@/types/type';
import {create} from 'zustand';

const useThemeStore = create<ThemeState>(set => ({
  theme: 'light',
  isSystem: false,
  setTheme: (theme: ThemeMode) => {
    set({theme});
  },
  setSystemTheme: (flag: boolean) => {
    set(state => ({...state, isSystem: flag}));
  },
}));

export default useThemeStore;
