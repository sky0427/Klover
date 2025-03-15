const queryKeys = {
  AUTH: 'auth',
  GET_AREA_POST: 'getAreaPost',
  GET_TOUR_POST: 'getTourPost',
  SEARCH_TOUR_POST: 'searchTourPost',
  GET_SURROUNDING_COMM_POST: 'getSurroundingCommPost',
} as const;

const storageKeys = {
  REFRESH_TOKEN: 'refreshToken',
  THEME_MODE: 'themeMode',
  THEME_SYSTEM: 'themeSystem',
  SHOW_LEGEND: 'showLegend',
  MARKER_FILTER: 'markerFilter',
} as const;

export {queryKeys, storageKeys};
