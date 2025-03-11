import {create} from 'zustand';

interface PageState {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  setPageInfo: (pageInfo: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
  }) => void;
}

const usePageStore = create<PageState>(set => ({
  pageNumber: 0,
  pageSize: 0,
  totalPages: 0,
  totalCount: 0,
  setPageInfo: pageInfo => set(pageInfo),
}));
