export interface ApiResponse<T> {
  returnCode: string;
  returnMessage: string;
  data?: T; // 일반적인 데이터 (Pageable, KloverPage를 사용하지 않는 경우)
  kloverPage?: KloverPage<T>; // KloverPage 데이터 (Pageable을 사용하는 경우)
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
  title: string;
  overview: string;
  addr1: string;
  firstimage?: string;
  mapX: number;
  mapY: number;
}

export interface DetailTourPost {
  contentId: number;
  commonPlaceId: number;
  avgRating: number;
  title: string;
  addr1: string;
  firstImage?: string;
  homepage?: string;
  mapX: number;
  mapY: number;
  overview?: string;
}

export interface TourPostPage {
  page: number;
  size: number;
}

export interface CommPostDto {
  memberId: number;
  nickname: string;
  mapX: number;
  mapY: number;
  imageUrls: string[];
  createdAt: Date;
}

export interface DetailCommPostDto extends CommPostDto {
  likeCount: number;
  content: string;
}

export interface CommPostPage {
  page: number;
  size: number;
}

export interface CommPostFrom {
  title: string;
  content: string;
}

export interface CombinedPostResponse {
  commPosts: KloverPage<CommPostDto>;
  tourPosts: KloverPage<TourPostDto>;
}
