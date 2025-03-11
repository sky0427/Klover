// @/stores/tourFilterStore.ts (Zustand store)
import {Area, ContentType, Country, TourPostSort} from '@/types';
import {create} from 'zustand';

interface TourFilterState {
  language: Country;
  area?: Area;
  contentType?: ContentType;
  hasExotic?: boolean;
  hasHealing?: boolean;
  hasActive?: boolean;
  hasTraditional?: boolean;
  sort?: TourPostSort;
  mapX?: number;
  mapY?: number;
  setLanguage: (language: Country) => void;
  setArea: (area?: Area) => void;
  setContentType: (contentType?: ContentType) => void;
  setHasExotic: (hasExotic?: boolean) => void;
  setHasHealing: (hasHealing?: boolean) => void;
  setHasActive: (hasActive?: boolean) => void;
  setHasTraditional: (hasTraditional?: boolean) => void;
  setSort: (sort?: TourPostSort) => void;
  setMapX: (mapX?: number) => void;
  setMapY: (mapY?: number) => void;
  resetFilters: () => void;
}

// 초기 상태
const initialFilterState = {
  language: Country.EN, // 기본값 설정
  area: undefined,
  contentType: undefined,
  hasExotic: undefined,
  hasHealing: undefined,
  hasActive: undefined,
  hasTraditional: undefined,
  sort: undefined,
  mapX: undefined,
  mapY: undefined,
};

export const useTourFilterStore = create<TourFilterState>(set => ({
  ...initialFilterState,
  setLanguage: language => set({language}),
  setArea: area => set({area}),
  setContentType: contentType => set({contentType}),
  setHasExotic: hasExotic => set({hasExotic}),
  setHasHealing: hasHealing => set({hasHealing}),
  setHasActive: hasActive => set({hasActive}),
  setHasTraditional: hasTraditional => set({hasTraditional}),
  setSort: sort => set({sort}),
  setMapX: mapX => set({mapX}),
  setMapY: mapY => set({mapY}),
  resetFilters: () => set(initialFilterState),
}));
