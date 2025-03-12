import {
  Area,
  ContentType,
  Country,
  KloverPage,
  TourPostDto,
  TourPostSort,
} from '@/types';
import {AxiosRequestConfig} from 'axios';
import {GET} from './commonApi';

const BASE_URL = '/api/v1/tour-post';
export interface SearchParams {
  language: Country;
  mapX: number;
  mapY: number;
  page?: number;
  size?: number;
  keyword?: string;
  sort?: TourPostSort;
  area?: Area;
  contentType?: ContentType;
  searchByTitle?: boolean;
  searchByOverview?: boolean;
  hasExotic?: boolean;
  hasHealing?: boolean;
  hasActive?: boolean;
  hasTraditional?: boolean;
}

export const searchTourPosts = async (
  params: SearchParams,
): Promise<KloverPage<TourPostDto> | undefined> => {
  const {
    language,
    mapX,
    mapY,
    page = 0,
    size = 20,
    keyword = '',
    sort = TourPostSort.Distance,
    area,
    contentType,
    searchByTitle = false,
    searchByOverview = false,
    hasExotic = false,
    hasHealing = false,
    hasActive = false,
    hasTraditional = false,
  } = params;

  const config: AxiosRequestConfig = {
    params: {
      language,
      mapX,
      mapY,
      page,
      size,
      keyword,
      sort,
      area,
      contenttype: contentType,
      title: searchByTitle,
      overview: searchByOverview,
      exotic: hasExotic,
      healing: hasHealing,
      active: hasActive,
      traditional: hasTraditional,
    },
  };

  try {
    const response = await GET<TourPostDto>('/api/v1/tour-post/search', config);
    return response.data.kloverPage;
  } catch (error) {
    console.error('API 요청 오류: ', error);
    throw error;
  }
};

export const searchTourPostsInfinite = async (
  params: SearchParams,
): Promise<KloverPage<TourPostDto> | undefined> => {
  const {
    language,
    mapX,
    mapY,
    page = 0,
    size = 20,
    keyword = '',
    sort = TourPostSort.Distance,
    area,
    contentType,
    searchByTitle = false,
    searchByOverview = false,
    hasExotic = false,
    hasHealing = false,
    hasActive = false,
    hasTraditional = false,
  } = params;

  const config: AxiosRequestConfig = {
    params: {
      language,
      mapX,
      mapY,
      page,
      size,
      keyword,
      sort,
      area,
      contenttype: contentType,
      title: searchByTitle,
      overview: searchByOverview,
      exotic: hasExotic,
      healing: hasHealing,
      active: hasActive,
      traditional: hasTraditional,
    },
  };

  try {
    const response = await GET<TourPostDto>('/api/v1/tour-post/search', config);
    return response.data.kloverPage;
  } catch (error) {
    console.error('API 요청 오류: ', error);
    throw error;
  }
};
