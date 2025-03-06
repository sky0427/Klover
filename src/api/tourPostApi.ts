import {DetailTourPost, TourPost} from '@/types/domain';
import {KloverPage} from '@/types/type';
import {GET, POST} from './commonApi';

const API_PREFIX = '/api/v1/tour-post';

const getAreaPost = async (
  language: string,
  areaCode: string,
  page: number,
  size: number,
): Promise<KloverPage<TourPost>> => {
  const response = await GET<TourPost>(
    `${API_PREFIX}/${language}/${areaCode}`,
    {params: {page, size}},
  );

  if (response.data.kloverPage) {
    return response.data.kloverPage;
  } else {
    throw new Error('Expected kloverPage in response');
  }
};

const getDetailTourPost = async (
  contentId: number,
): Promise<DetailTourPost> => {
  const response = await GET<DetailTourPost>(
    `${API_PREFIX}/detail/${contentId}`,
  );

  if (response.data.data) {
    return response.data.data;
  } else {
    throw new Error('Expected data in response');
  }
};

const getCollectionTourPost = async (
  page: number,
  size: number,
): Promise<KloverPage<TourPost>> => {
  const response = await GET<TourPost>(`${API_PREFIX}/collection`, {
    params: {page, size},
  });

  if (response.data.kloverPage) {
    return response.data.kloverPage;
  } else {
    throw new Error('Expected kloverPage in response');
  }
};

const searchTourPost = async (
  language: string,
  keyword: string,
  page: number,
  size: number,
): Promise<KloverPage<TourPost>> => {
  const response = await GET<TourPost>(`${API_PREFIX}/${language}`, {
    params: {keyword, page, size},
  });

  if (response.data.kloverPage) {
    return response.data.kloverPage;
  } else {
    throw new Error('Expected kloverPage in response');
  }
};

const addCollectionTourPost = async (contentId: number): Promise<string> => {
  const response = await POST<string>(`${API_PREFIX}/collection/${contentId}`);

  return response.data.returnCode;
};

const deleteCollectionTourPost = async (contentId: number): Promise<string> => {
  const response = await POST<string>(
    `${API_PREFIX}/collection/${contentId}`,
    undefined,
    {method: 'DELETE'},
  );

  return response.data.returnCode;
};

export {
  getAreaPost,
  getDetailTourPost,
  getCollectionTourPost,
  searchTourPost,
  addCollectionTourPost,
  deleteCollectionTourPost,
};
