import {DetailTourPost, TourPostDto} from '@/types/domain';
import {ApiResponse, KloverPage} from '@/types/domain';
import {GET, POST} from './commonApi';
import {Area, ContentType, Country, TourPostSort} from '@/types';
import {axiosInstance} from '@/utils/axios';

const API_PREFIX = '/api/v1/tour-post';

export interface FilterParams {
  page?: number;
  size?: number;
  language: Country;
  area?: Area;
  contentType?: ContentType;
  hasExotic?: boolean;
  hasHealing?: boolean;
  hasActive?: boolean;
  hasTranditional?: boolean;
  sort?: TourPostSort;
  mapX: number;
  mapY: number;
}

export const getFilteredTourPosts = async (
  params: FilterParams,
): Promise<KloverPage<TourPostDto>> => {
  const {
    page = 0,
    size = 20,
    language,
    area,
    contentType,
    hasExotic,
    hasHealing,
    hasActive,
    hasTranditional,
    sort,
    mapX,
    mapY,
  } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    language: language,
    ...(area && {area: area}),
    ...(contentType && {contenttype: contentType}),
    ...(hasExotic && {exotic: hasExotic.toString()}),
    ...(hasHealing && {healing: hasHealing.toString()}),
    ...(hasActive && {active: hasActive.toString()}),
    ...(hasTranditional && {traditional: hasTranditional.toString()}),
    ...(sort && {sort: sort}),
    mapX: mapX.toString(),
    mapY: mapY.toString(),
  });

  try {
    const response = await GET<KloverPage<TourPostDto>>(
      `${API_PREFIX}/search?${queryParams.get.toString()}`,
    );

    if (response.data.returnCode !== '0000') {
      throw new Error(
        response.data.returnMessage || 'Failed to filter tour posts',
      );
    }
    return (
      response.data.data ?? {
        contents: [],
        pageNumber: 0,
        pageSize: 0,
        totalPages: 0,
        totalCount: 0,
      }
    );
  } catch (error) {
    console.error('Error filtering data', error);
    throw error;
  }
};

export interface SearchParams {
  page?: number;
  size?: number;
  keyword?: string;
  language: Country;
  searchByTitle?: boolean;
  searchByOverview?: boolean;
  sort?: TourPostSort;
  mapX: number;
  mapY: number;
}

export const searchTourPosts = async (
  params: SearchParams,
): Promise<ApiResponse<KloverPage<TourPostDto>>> => {
  const {
    page = 0,
    size = 20,
    keyword,
    language,
    searchByTitle = true,
    searchByOverview = true,
    sort,
    mapX,
    mapY,
  } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    // keyword,
    language,
    title: searchByTitle.toString(),
    overview: searchByOverview.toString(),
    mapX: mapX.toString(),
    mapY: mapY.toString(),
    ...(sort && {sort: sort}),
    ...(keyword && {keyword: keyword}),
  });

  try {
    const response = await GET<KloverPage<TourPostDto>>(
      `/tour-post/search?${queryParams.toString()}`,
    );

    if (response.returnCode !== '0000') {
      throw new Error(response.returnMessage || 'Failed to search Tour Posts');
    }

    return response;
  } catch (error) {
    console.error('Error searching data', error);
    throw error;
  }
};

export interface NearByParams {
  page?: number;
  size?: number;
  language: Country;
  mapX: number; // 필수
  mapY: number; // 필수
  sort?: TourPostSort;
  area?: Area; // 선택적 파라미터
  contentType?: ContentType;
}

export const getNearByTourPosts = async (
  params: NearByParams,
): Promise<KloverPage<TourPostDto>> => {
  const {
    page = 0,
    size = 20,
    language,
    mapX,
    mapY,
    sort,
    area,
    contentType,
  } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    language,
    mapX: mapX.toString(),
    mapY: mapY.toString(),
    ...(sort && {sort: sort}),
    ...(area && {area: area}),
    ...(contentType && {contenttype: contentType}),
  });

  try {
    const response = await GET<TourPostDto>(
      `${API_PREFIX}/search?${queryParams.get.toString}`,
    );

    if (response.data.returnCode !== '0000') {
      throw new Error(
        response.data.returnMessage || 'Failed to get nearby Tour Data',
      );
    }

    return response.data.kloverPage!;
  } catch (error) {
    console.log('Error getting near by tour posts', error);
    throw error;
  }
};
