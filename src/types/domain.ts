export interface TourPost {
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
