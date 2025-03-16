import {
  getAreaPost,
  getDetailTourPost,
  getMemberCollectionTourPost,
  SearchParams,
  searchTourPost,
  searchTourPosts,
} from '@/api';
import {queryKeys} from '@/constants/keys';
import {DetailTourPostDto, KloverPage, TourPostDto} from '@/types';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';

export const useTourPostsQuery = (params: SearchParams) => {
  const queryResult = useQuery<KloverPage<TourPostDto> | undefined, Error>({
    queryKey: [queryKeys.GET_TOUR_POST, params],
    queryFn: async () => {
      try {
        const response = await searchTourPosts(params);
        console.log('✅ API 응답 데이터:', response);

        if (!response) {
          throw new Error('Failed to fetch tour posts');
        }

        return response;
      } catch (error) {
        console.error('❌ API 요청 실패:', error);
        throw error;
      }
    },
    // initialData: {
    //   contents: [],
    //   pageNumber: 0,
    //   pageSize: 10,
    //   totalCount: 0,
    //   totalPages: 0,
    // },
    staleTime: 1000 * 60 * 3,
  });

  return queryResult;
};

export const useTourPostsInfiniteQuery = (
  params: Omit<SearchParams, 'page'>,
) => {
  const queryResult = useInfiniteQuery<KloverPage<TourPostDto>, Error>({
    queryKey: ['tourPostsInfinite', params],
    queryFn: async ({pageParam = 0}: {pageParam: any}) => {
      try {
        const response = await searchTourPosts({
          ...params,
          page: pageParam,
        });

        if (!response) {
          throw new Error('Failed to fetch tour posts');
        }

        console.log('✅ API 응답 데이터:', response);

        return response;
      } catch (error) {
        console.error('❌ API 요청 실패:', error);
        throw error;
      }
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.pageNumber + 1 < lastPage.totalPages) {
        return lastPage.pageNumber + 1;
      }
      return undefined;
    },
    enabled: false,
    staleTime: 1000 * 60 * 5,
  });

  return queryResult;
};

// 사용자 언어 & 지역 기반 관광지 데이터 조회
export const useGetAreaPost = (
  language: string,
  areaCode: string,
  page: number,
  size: number,
) => {
  return useQuery({
    queryKey: [queryKeys.GET_AREA_POST, 'area', language, areaCode, page, size],
    queryFn: () => getAreaPost(language, areaCode, page, size),
  });
};

// 해당 관광지 상세 조회
export const useGetDetailTourPost = (id: number) => {
  return useQuery<DetailTourPostDto, Error>({
    queryKey: [queryKeys.GET_DETAIL_TOUR_POST, 'detail', id],
    queryFn: async (): Promise<DetailTourPostDto> => {
      const response = await getDetailTourPost(id);
      return response;
    },
  });
};

// 해당 사용자가 저장한 관광지 조회
export const useGetMemberCollectionTourPost = (
  memberId: number,
  page: number,
  size: number,
) => {
  return useQuery({
    queryKey: [
      queryKeys.GET_MEMBER_COLLECTION_TOUR_POST,
      'collection',
      memberId,
      page,
      size,
    ],
    queryFn: () => getMemberCollectionTourPost(memberId, page, size),
  });
};

// 사용자 언어 & 관광지명/지역명 검색
export const useSearchTourPost = (
  language: string,
  keyword: string,
  page: number,
  size: number,
) => {
  return useQuery({
    queryKey: [
      queryKeys.SEARCH_TOUR_POST,
      'search',
      language,
      keyword,
      page,
      size,
    ],
    queryFn: () => searchTourPost(language, keyword, page, size),
  });
};
