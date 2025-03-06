import {getAreaPost, getCollectionTourPost, searchTourPost} from '@/api';
import {queryKeys} from '@/constants/keys';
import {TourPost} from '@/types';
import {KloverPage} from '@/types/type';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';

// 지역 기반 관광지 목록 가져오기

const useAreaPostInfiniteQuery = (language: string, areaCode: string) => {
  const queryResult = useInfiniteQuery<KloverPage<TourPost>, Error>({
    queryKey: [queryKeys.GET_AREA_POST, language, areaCode],
    queryFn: async ({pageParam = 0}: any) => {
      const response = await getAreaPost(language, areaCode, pageParam, 15);
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.pageNumber + 1;
      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5분
  });

  return queryResult;
};

//사용자 저장 관광지 목록 가져오기

const useCollectionTourPostInfiniteQuery = () => {
  const queryResult = useInfiniteQuery<KloverPage<TourPost>, Error>({
    queryKey: [queryKeys.GET_TOUR_POST],
    queryFn: async ({pageParam = 0}: any) => {
      const response = await getCollectionTourPost(pageParam, 15);

      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.pageNumber + 1;
      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },
  });
  return queryResult;
};

// 관광지명, 지역명 검색
const useSearchTourPostInfiniteQuery = (language: string, keyword: string) => {
  const queryResult = useInfiniteQuery<KloverPage<TourPost>, Error>({
    queryKey: [queryKeys.SEARCH_TOUR_POST, language, keyword],
    queryFn: async ({pageParam = 0}: any) => {
      const response = await searchTourPost(language, keyword, pageParam, 15);

      return response;
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      const nextPage = lastPage.pageNumber + 1;
      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },
  });
  return queryResult;
};

export {
  useAreaPostInfiniteQuery,
  useCollectionTourPostInfiniteQuery,
  useSearchTourPostInfiniteQuery,
};
