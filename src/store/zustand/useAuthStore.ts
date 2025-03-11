import {MemberDto} from '@/types/auth';
import {create} from 'zustand';

interface AuthState {
  user: MemberDto | null;
  setUser: (user: MemberDto) => void;
  clearUser: () => void;
}

const useAuthStore = create<AuthState>(set => ({
  user: null,
  setUser: user => set({user}),
  clearUser: () => set({user: null}),
}));

export default useAuthStore;
