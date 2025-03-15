import {MemberDto} from '@/types/auth';
import {create} from 'zustand';
import EncryptedStorage from 'react-native-encrypted-storage';
import {getMemberState} from '@/api/authApi';

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  user: MemberDto | null;
  setUser: (user: MemberDto) => void;
  clearUser: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  initializeAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState>(set => ({
  token: null,
  setToken: token => set({token}),
  user: null,
  setUser: user => set({user}),
  clearUser: () => set({user: null}),
  isAuthenticated: false,
  isLoading: true,
  initializeAuth: async () => {
    try {
      const accessToken = await EncryptedStorage.getItem('accessToken');

      if (accessToken) {
        const memberInfo = await getMemberState();
        set({
          token: accessToken,
          user: memberInfo,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({isLoading: false});
      }
    } catch (error) {
      console.error('Failed to initialize auth: ', error);

      await EncryptedStorage.removeItem('accessToken');
      set({isLoading: false, token: null, user: null, isAuthenticated: false});
    }
  },
}));

export default useAuthStore;
