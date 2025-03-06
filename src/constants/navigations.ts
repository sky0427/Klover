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
  HOME: 'Home',
} as const;

const mapNavigations = {
  MAP_HOME: 'MapHome',
  ADD_POST: 'AddPost',
  SEARCH_LOCATION: 'SearchLocation',
} as const;

const feedNavigations = {
  FEED_HOME: 'FeedHome',
  FEED_DETAIL: 'FeedDetail',
  EDIT_POST: 'EditPost',
} as const;

const settingNavigations = {
  SETTING_HOME: 'SettingHome',
  EDIT_PROFILE: 'EditProfile',
  DELETE_ACCOUNT: 'DeleteAccount',
  EDIT_CATEGORY: 'EditCategory',
} as const;

export {
  mainNavigation,
  authNavigations,
  homeNavigations,
  mapNavigations,
  feedNavigations,
  settingNavigations,
};
