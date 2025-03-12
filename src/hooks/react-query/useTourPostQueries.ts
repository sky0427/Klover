import {SearchParams, searchTourPosts, searchTourPostsInfinite} from '@/api';
import {queryKeys} from '@/constants/keys';
import {KloverPage, TourPostDto, TourPostSort} from '@/types';
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
        const response = await searchTourPostsInfinite({
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
