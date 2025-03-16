import CustomIcon from '@/components/shared/CustomIcon';
import CustomText from '@/components/shared/CustomText';
import {colors} from '@/constants/colors';
import {mainNavigation} from '@/constants/navigations';
import useThemeStore from '@/store/useThemeStore';
import useAuthStore from '@/store/zustand/useAuthStore';
import {ThemeMode} from '@/types/type';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {MainDrawerParamList} from './MainDrawerNavigator';

type Navigation = DrawerNavigationProp<MainDrawerParamList>;

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {user} = useAuthStore();

  return (
    <View style={styles.container}>
      {/* Drawer Items */}
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}>
        {/* User Profile Section */}

        <TouchableOpacity
          style={styles.userInfoContainer}
          onPress={() => props.navigation.navigate(mainNavigation.PROFILE)}>
          <View style={styles.userImageContainer}>
            {user?.profileUrl ? (
              <Image source={{uri: user?.profileUrl}} />
            ) : (
              <Image
                source={require('@/assets/images/user-default.png')}
                style={styles.userImage}
              />
            )}
          </View>
          <CustomText style={styles.userName} fontWeight="semibold">
            {user?.nickname}
          </CustomText>
          <CustomText style={styles.userLocation} fontWeight="regular">
            {user?.email}
          </CustomText>
        </TouchableOpacity>

        <View style={styles.drawerItemListContainer}>
          <DrawerItemList {...props} />
        </View>

        <View style={styles.divider} />

        <DrawerItem
          key={1}
          label={({focused}) => (
            <View style={styles.drawerItemContainer}>
              <CustomIcon
                name="Settings3FillSvg"
                color="rgba(255,255,255,0.6)"
              />
              <CustomText
                fontWeight={'semibold'}
                style={{color: 'rgba(255,255,255,0.6)'}}>
                Language
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
              <CustomIcon name="ExitLineSvg" color={'rgba(255,255,255,0.6)'} />
              <CustomText
                fontWeight={'semibold'}
                style={{color: 'rgba(255,255,255,0.6)'}}>
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
      gap: 12,
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
      borderRadius: 40,
    },
  });

export default CustomDrawerContent;
