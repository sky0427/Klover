const mainNavigation = {
  HOME: 'Home',
  EXPLORE: 'Explore',
  COMMUNITY: 'Community',
  NOTIFICATION: 'Notification',
  MESSAGES: 'Messages',
  PROFILE: 'Profile',
  SETTING: 'Setting',
} as const;

const authNavigations = {
  AUTH_HOME: 'AuthHome',
  SIGNIN: 'Signin',
  SIGNUP: 'Signup',
} as const;

const homeNavigations = {
  MAIN_HOME: 'MainHome',
  SEARCH: 'Search',
  FILTER: 'Filter',
  TOUR_DETAIL: 'TourDetail',
} as const;

const mapNavigations = {
  MAP_HOME: 'MapHome',
  ADD_POST: 'AddPost',
  SEARCH_LOCATION: 'SearchLocation',
} as const;

const commNavigations = {
  COMM_HOME: 'CommHome',
  COMM_DETAIL: 'CommDetail',
  EDIT_POST: 'EditPost',
  ADD_POST: 'AddPost',
} as const;

const commTabNavigations = {
  COMM_HOME: 'CommTabHome',
  COMM_FAVORITE: 'CommFavorite',
  ADD_POST: 'AddPost',
} as const;

const settingNavigations = {
  SETTING_HOME: 'SettingHome',
  EDIT_PROFILE: 'EditProfile',
  DELETE_ACCOUNT: 'DeleteAccount',
  EDIT_CATEGORY: 'EditCategory',
} as const;

export {
  authNavigations,
  commNavigations,
  commTabNavigations,
  homeNavigations,
  mainNavigation,
  mapNavigations,
  settingNavigations,
};
