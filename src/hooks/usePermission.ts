import {alerts} from '@/constants/messages';
import {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {check, Permission, PERMISSIONS} from 'react-native-permissions';

type PermissionType = 'LOCATION' | 'PHOTO';

type PermissionOS = {
  [key in PermissionType]: Permission;
};

const androidPermissions: PermissionOS = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const iosPermissions: PermissionOS = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

function usePermission(type: PermissionType) {
  useEffect(() => {
    async () => {
      const isAndroid = Platform.OS === 'android';
      const permissionOS = isAndroid ? androidPermissions : iosPermissions;
      const checked = await check(permissionOS[type]);

      const showPermissionAlert = () => {
        Alert.alert(
          alerts[`${type}_PERMISSION`].TITLE,
          alerts[`${type}_PERMISSION`].DESCRIPTION,
          [
            {
              text: 'Setting',
              onPress: () => Linking.openSettings(),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
        );
      };
    };
  });
}

export default usePermission;
