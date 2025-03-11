import {AxiosResponse} from 'axios';
import {GET} from './commonApi';
import {CombinedPostResponse, CommPostDto, CommPostPage} from '@/types';
import {KloverPage, XYForm} from '@/types/type';

// 사용자 위치 주변 게시글(관광지&사용자) 조회
const getSurroundingPosts = async (
  page: CommPostPage,
  xyForm: XYForm,
): Promise<CombinedPostResponse> => {
  const response: AxiosResponse = await GET<CombinedPostResponse>(
    '/comm-post/surroundings',
    {params: {page: page.page, size: page.size}, data: xyForm},
  );
  return response.data;
};

// 본인 게시물 조회
const getMyPosts = () => {};

// 해당 게시물 상세 조회
const getPostDetail = () => {};

// 사용자가 저장한 게시글 조회
const getCollectedPosts = () => {};

// 사용자 닉네임 & 게시글 내용 검색
const searchPosts = () => {};

// 해당 게시글 저장
const addPostToCollection = () => {};

// 해당 게시글 저장 취소
const removePostFromCollection = () => {};

// 게시글 좋아요
const likeCommPost = () => {};

// 게시글 좋아요 취소
const unlikeCommPost = () => {};

// 게시글 생성
const createCommPost = () => {};

// 해당 게시물 수정
const updateCommPost = () => {};

// 해당 게시글 삭제
const deleteCommPost = () => {};

// 게시글 검색 (엘라스틱 서치)
const searchPostsElastic = () => {};

export {getSurroundingPosts};
