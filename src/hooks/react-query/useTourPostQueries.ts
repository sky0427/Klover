import {
  FilterParams,
  getFilteredTourPosts,
  getNearByTourPosts,
  NearByParams,
  SearchParams,
  searchTourPosts,
} from '@/api';
import {TourPostDto} from '@/types';
import {ApiResponse, KloverPage} from '@/types/domain';
import {useQuery} from '@tanstack/react-query';

export const useFilteredTourPosts = (params: FilterParams) => {
  return useQuery<KloverPage<TourPostDto>, Error>({
    queryKey: ['filteredTourPosts', params],
    queryFn: () => getFilteredTourPosts(params),
    staleTime: 1000 * 60 * 5,
  });
};

export const useSearchTourPosts = (params: SearchParams) => {
  return useQuery<ApiResponse<KloverPage<TourPostDto>>, Error>({
    queryKey: ['searchTourPosts', params],
    queryFn: () => searchTourPosts(params),
    staleTime: 1000 * 60 * 1,
  });
};

export const useNearbyTourPosts = (params: NearByParams) => {
  return useQuery<KloverPage<TourPostDto>, Error>({
    queryKey: ['nearbyTourPosts', params],
    queryFn: () => getNearByTourPosts(params),
    staleTime: 1000 * 60 * 1,
  });
};
