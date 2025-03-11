import {create} from 'zustand';

interface TourSearchState {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

export const useTourSearchStore = create<TourSearchState>(set => ({
  keyword: '',
  setKeyword: keyword => set({keyword}),
}));
