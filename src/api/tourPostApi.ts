import {
  ApiResponse,
  Area,
  ContentType,
  Country,
  DetailTourPostDto,
  KloverPage,
  TourPostDto,
  TourPostSort,
} from '@/types';
import {AxiosRequestConfig} from 'axios';
import {DELETE, GET, POST} from './commonApi';

const TOUR_POST_BASE_URL = '/api/v1/tour-post';
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

// 관광지 ES 검색
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

// 사용자 언어 & 지역 기반 관광지 데이터 조회
export const getAreaPost = async (
  language: string,
  areaCode: string,
  page: number,
  size: number,
): Promise<ApiResponse<KloverPage<TourPostDto>>> => {
  const response = await GET<KloverPage<TourPostDto>>(
    `${TOUR_POST_BASE_URL}/${language}/${areaCode}?page=${page}&size=${size}`,
  );
  return response.data;
};

// 해당 관광지 상세 조회
export const getDetailTourPost = async (
  contentId: number,
): Promise<DetailTourPostDto> => {
  const response = await GET<DetailTourPostDto>(
    `${TOUR_POST_BASE_URL}/detail/${contentId}`,
  );

  const body = response.data;

  if (body.returnCode !== '0000') {
    throw new Error(body.returnMessage);
  }

  const data = body.data;

  if (!data) {
    throw new Error(body.returnMessage);
  }

  return data;
};

// 해당 사용자가 저장한 관광지 조회
export const getMemberCollectionTourPost = async (
  memberId: number,
  page: number,
  size: number,
): Promise<ApiResponse<KloverPage<TourPostDto>>> => {
  const response = await GET<KloverPage<TourPostDto>>(
    `${TOUR_POST_BASE_URL}/collection/${memberId}`,
    {
      params: {
        page,
        size,
      },
    },
  );
  return response.data;
};

// 사용자 언어 & 관광지명/지역명 검색
export const searchTourPost = async (
  language: string,
  keyword: string,
  page: number,
  size: number,
): Promise<ApiResponse<KloverPage<TourPostDto>>> => {
  const response = await GET<KloverPage<TourPostDto>>(
    `${TOUR_POST_BASE_URL}/${language}?keyword=${keyword}&page=${page}&size=${size}`,
  );
  return response.data;
};

// 해당 관광지 저장
export const addCollectionTourPost = async (
  contentId: number,
): Promise<ApiResponse<string>> => {
  const response = await POST<string>(
    `${TOUR_POST_BASE_URL}/collection/${contentId}`,
  );
  return response.data;
};

// 해당 관광지 저장 취소
export const deleteCollectionTourPost = async (
  contentId: number,
): Promise<ApiResponse<string>> => {
  const response = await DELETE<string>(
    `${TOUR_POST_BASE_URL}/collection/${contentId}`,
  );
  return response.data;
};
