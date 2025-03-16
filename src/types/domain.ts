import {ImageOrVideo} from 'react-native-image-crop-picker';
import {NotiEventType, TargetObject} from './enum';
import {MarkerColor} from './marker';

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

export interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  color: MarkerColor;
  score: number;
}

export interface TourPostDto {
  contentId: number;
  commonPlaceId: number;
  avgRating: number;
  reviewCount: number;
  title: string;
  overview: string;
  addr1: string;
  firstImage?: string;
  mapX: number;
  mapY: number;
}

export interface DetailTourPostDto {
  contentId: number;
  commonPlaceId: number;
  avgRating: number;
  reviewCount: number;
  title: string;
  addr1: string;
  firstImage?: string | undefined;
  homepage?: string;
  mapX: number;
  mapY: number;
  overview?: string;
  isSaved?: boolean;
}

export interface ReviewDto {
  id: number;
  memberId: number;
  nickname: string;
  content: string;
  rating: number;
  createDate: string;
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

export interface CreateChatRoomRequest {
  title: string;
  memberIds: number[];
}

export interface ModifyChatRoomTitleRequest {
  title: string;
  chatRoomId: number;
}

export interface ChatRoomBatchActionRequest {
  memberIds: number[];
  chatRoomId: number;
}

export interface GetChatMessageRequest {
  chatRoomId: number;
  page: number;
  pointTime: Date;
}

export interface WriteChatMessageRequest {
  content: string;
  chatRoomId: number;
}

export interface LeaveChatRoomRequest {
  chatRoomId: number;
}

export interface ChatRoomDto {
  id: number;
  memberId: number;
  title: string;
  memberCount: number;
}

export interface ChatMessageDto {
  id: number;
  memberId: number;
  nickname: number;
  content: number;
  imageUrls: string[];
  readCount: number;
  createDate: Date;
  profileImageUrl: string;
}

export interface NotificationMessage {
  body: string;
  eventType: NotiEventType;
  object: TargetObject;
  objectId: number;
  title: string;
  customField: CustomField;
}

export interface CustomField {
  actor_nickname: string;
  content: string;
  receiver_id: number;
  receiver_nicknname: number;
}
