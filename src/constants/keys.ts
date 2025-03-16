const queryKeys = {
  AUTH: 'auth',
  GET_AREA_POST: 'getAreaPost',
  GET_TOUR_POST: 'getTourPost',
  SEARCH_TOUR_POST: 'searchTourPost',
  SEARCH_COMM_POST: 'searchCommPost',
  GET_COMM_POST_DETAIL: 'getCommPostDetail',
  GET_COMM_POST_COMMENT: 'getCommPostComment',
  GET_DETAIL_TOUR_POST: 'GetDetailTourPost',
  GET_MEMBER_COLLECTION_TOUR_POST: 'GetMemberCollectionTourPost',
  SEARCH_TOUR_POST_ES: 'SearchTourPostEs',
  ADD_COLLECTION_TOUR_POST: 'AddCollectionTourPost',
  DELETE_COLLECTION_TOUR_POST: 'DeleteCollectionTourPost',
  GET_NOTIFICATION: 'GetNotification',
} as const;

const storageKeys = {
  REFRESH_TOKEN: 'refreshToken',
  THEME_MODE: 'themeMode',
  THEME_SYSTEM: 'themeSystem',
  SHOW_LEGEND: 'showLegend',
  MARKER_FILTER: 'markerFilter',
} as const;

export {queryKeys, storageKeys};
