import CustomIcon from '@/components/shared/CustomIcon';
import CustomText from '@/components/shared/CustomText';
import {colors} from '@/constants/colors';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Image, StyleSheet, View} from 'react-native';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  // const {getProfileQuery} = useAuth();

  return (
    <View style={styles.container}>
      {/* Drawer Items */}
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}>
        {/* User Profile Section */}

        <View style={styles.userInfoContainer}>
          <View style={styles.userImageContainer}>
            <Image
              source={require('@/assets/images/user-default.png')}
              style={styles.userImage}
            />
          </View>
          <CustomText style={styles.userName} fontWeight="semibold">
            Jemma Ray
          </CustomText>
          <CustomText style={styles.userLocation} fontWeight="regular">
            San Francisco, USA
          </CustomText>
        </View>

        <View style={styles.drawerItemListContainer}>
          <DrawerItemList {...props} />
        </View>

        <View style={styles.divider} />

        <DrawerItem
          key={1}
          label={({focused}) => (
            <View style={styles.drawerItemContainer}>
              <CustomIcon name="Settings3FillSvg" />
              <CustomText fontWeight={focused ? 'semibold' : 'regular'}>
                Setting
              </CustomText>
            </View>
          )}
          onPress={() => {}}
          activeBackgroundColor="#333"
          style={styles.drawerItem}
        />

        <DrawerItem
          key={2}
          label={({focused}) => (
            <View style={styles.drawerItemContainer}>
              <CustomIcon name="ExitLineSvg" />
              <CustomText fontWeight={focused ? 'semibold' : 'regular'}>
                Logout
              </CustomText>
            </View>
          )}
          onPress={() => {}}
          activeBackgroundColor="#333"
          style={styles.drawerItem}
        />
      </DrawerContentScrollView>
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
    },
    userInfoContainer: {
      alignItems: 'center',
      marginVertical: 48,
    },
    userImageContainer: {
      width: 100,
      height: 100,
      borderRadius: 40,
      marginBottom: 12,
    },
    userImage: {
      width: '100%',
      height: '100%',
      borderRadius: 35,
    },
    userName: {
      fontSize: 16,
      color: colors[theme].UNCHANGE_WHITE,
      marginBottom: 3,
    },
    userLocation: {
      fontSize: 12,
      color: colors[theme].GRAY_100,
    },
    drawerItemListContainer: {
      flex: 1,
    },
    drawerItemContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    divider: {
      height: 1,
      backgroundColor: colors[theme].GRAY_100,
      marginVertical: 15,
      marginHorizontal: 20,
    },
    drawerItem: {
      marginVertical: 3,
      borderRadius: 16,
    },
  });

export default CustomDrawerContent;
