import CustomIcon from '@/components/shared/CustomIcon';
import CustomText from '@/components/shared/CustomText';
import {colors} from '@/constants/colors';
import {mainNavigation, settingNavigations} from '@/constants/navigations';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  // const {getProfileQuery} = useAuth();

  const handlePressSetting = () => {
    props.navigation.navigate(mainNavigation.SETTING, {
      screen: settingNavigations.SETTING_HOME,
    });
  };

  return (
    <>
      {/* Drawer Items */}
      <DrawerContentScrollView
        {...props}
        scrollEnabled={true}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}>
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

          <View style={styles.drawerItemsContainer}>
            <DrawerItemList {...props} />
          </View>

          <View style={{justifyContent: 'flex-end'}}>
            <Pressable
              style={{
                width: '100%',
                padding: 20,
                flexDirection: 'row',
                backgroundColor: 'blue',
                gap: 12,
              }}>
              <CustomIcon name="ExitLineSvg" size={24} color="#fff" />
              <CustomText>Logout</CustomText>
            </Pressable>
          </View>
        </View>
      </DrawerContentScrollView>
    </>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      backgroundColor: '#5843BE',
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
      color: colors[theme].GRAY_100,
      marginBottom: 3,
    },
    userLocation: {
      fontSize: 12,
      color: colors[theme].GRAY_100,
    },
    drawerItemsContainer: {
      flex: 1,
    },
    bottomContainer: {
      justifyContent: 'flex-end',
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: colors[theme].GRAY_100,
    },
    language: {
      color: '#fff',
      fontSize: 16,
    },
    logout: {
      color: '#fff',
      fontSize: 16,
    },
  });

export default CustomDrawerContent;
