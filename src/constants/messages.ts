const errorMessages = {
  CANNOT_GET_ADDRESS: '주소를 알 수 없습니다.',
  UNEXPECT_ERROR: '알 수 없는 에러가 발생했습니다.',
} as const;

const alerts = {
  LOCATION_PERMISSION: {
    TITLE: 'Allow location permission is required.',
    DESCRIPTION: 'Please allow location permission on the settings screen.',
  },
  PHOTO_PERMISSION: {
    TITLE: 'Allow photo permission is required.',
    DESCRIPTION: 'Please allow photo permission on the settings screen.',
  },
  NOT_SELECTED_LOCATION: {
    TITLE: 'Please select a location to add.',
    DESCRIPTION: 'Press and hold on the map to select the location.',
  },
  DELETE_POST: {
    TITLE: 'Are you sure you want to delete it?',
    DESCRIPTION: 'It will be deleted from both the post and the map.',
  },
  DELETE_ACCOUNT: {
    TITLE: 'Are you sure you want to leave?',
    DESCRIPTION: 'Member information is deleted and cannot be recovered.',
  },
} as const;

export {errorMessages, alerts};
