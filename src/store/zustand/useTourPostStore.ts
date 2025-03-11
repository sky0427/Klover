import {DetailTourPost, TourPostDto} from '@/types/domain';
import {create} from 'zustand';

interface TourPostState {
  tourPosts: TourPostDto[];
  detailTourPost: DetailTourPost | null;
  setTourPosts: (tourPosts: TourPostDto[]) => void;
  setDetailTourPost: (detailTourPost: DetailTourPost | null) => void;
}

const useTourPostStore = create<TourPostState>(set => ({
  tourPosts: [],
  detailTourPost: null,
  setTourPosts: tourPosts => set({tourPosts}),
  setDetailTourPost: detailTourPost => set({detailTourPost}),
}));

export default useTourPostStore;
