import {ImageOrVideo} from 'react-native-image-crop-picker';
import {LatLng} from 'react-native-maps';

export interface ApiResponse<T> {
  returnCode: string;
  returnMessage: string;
  data?: T;
  kloverPage?: KloverPage<T>;
}

export interface PageDto {
  page: number;
  size: number;
}

export interface KloverPage<T> {
  contents: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}
export interface TourPostDto {
  contentId: number;
  commonPlaceId: number;
  avgRating: number;
  title: string;
  overview: string;
  addr1: string;
  firstimage?: string;
  mapX: number;
  mapY: number;
}

export interface DetailTourPostDto {
  contentId: number;
  commonPlaceId: number;
  avgRating: number;
  title: string;
  addr1: string;
  firstImage?: string | undefined;
  homepage?: string;
  mapX: number;
  mapY: number;
  overview?: string;
}

export interface CommPostDto {
  id: number;
  memberId: number;
  nickname: string;
  mapX: number;
  mapY: number;
  imageUrls: string[];
  createdAt: Date;
}
export interface CommPostDetailDto {
  memberId: number;
  id: number;
  nickname: string;
  likeCount: number;
  commentCount: number;
  mapX: number;
  mapY: number;
  content: string;
  imageUrls: string[];
  createDate: Date;
  profileImageUrl: string | null;
  isLiked: boolean;
  isSaved: boolean;
}

export interface CombinedPostResponse {
  commPosts: KloverPage<CommPostDto>;
  tourPosts: KloverPage<TourPostDto>;
}

export interface CommentDto {
  id: number;
  memberId: number;
  nickname: string;
  likeCount: number;
  content: string;
  superCommentId: number;
  createDate: Date;
  profileImageUrl: string | null;
  isLiked: boolean;
}

export interface CommentLikeRequest {
  commentId: number;
}

export interface CommPostRequest {
  commPostId: number;
}

export interface CommPostWriteRequest {
  img: ImageOrVideo | undefined;
  content: string;
  mapX: number;
  mapY: number;
}

export interface CommPostModifyRequest {
  img: ImageOrVideo | undefined;
  content: string;
  mapX: number;
  mapY: number;
  commPostId: number;
}

export interface CommentWriteRequest {
  content: string;
  commPostId: number;
}

export interface CommentModifyRequest {
  commentId: number;
  content: string;
}

export interface CommentDeleteRequest {
  commentId: number;
}
