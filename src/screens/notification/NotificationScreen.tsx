import CustomHeader from '@/components/shared/CustomHeader';
import CustomText from '@/components/shared/CustomText';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import {colors} from '@/constants/colors';
import {spacing} from '@/constants/theme';
import {useNotificationInfiniteQuery} from '@/hooks/react-query/useNotificationQuery';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import useThemeStore from '@/store/useThemeStore';
import useAuthStore from '@/store/zustand/useAuthStore';
import {ThemeMode} from '@/types/type';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

type Navigation = DrawerNavigationProp<MainDrawerParamList>;

const NotificationScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<Navigation>();

  const {user} = useAuthStore();

  const {data, hasNextPage, fetchNextPage} = useNotificationInfiniteQuery(
    user?.id as number,
  );

  function NotificationItem() {
    return (
      <View style={styles.notificationItem}>
        <View style={styles.notificationContent}>
          <TouchableOpacity>
            <Image
              source={require('@/assets/images/user-default.png')}
              style={styles.avatar}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <View style={styles.notificationInfo}>
            <TouchableOpacity>
              <CustomText fontWeight="semibold" style={styles.username}>
                username
              </CustomText>
            </TouchableOpacity>
            <CustomText style={styles.action}>liked your post</CustomText>
            <CustomText style={styles.timeAgo}>created time</CustomText>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScreenWrapper>
      <CustomHeader
        iconColor={colors[theme].PRIMARY}
        onLeftIconPress={navigation.goBack}>
        <CustomText fontWeight="bold" style={styles.headerTitle}>
          Notifications
        </CustomText>
      </CustomHeader>

      <View style={styles.listContainer}>
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
      </View>

      {/* <FlashList
        data={}
        renderItem={({item}) => <NotificationItem notification={item} />}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      /> */}
    </ScreenWrapper>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].GRAY_100,
    },
    header: {
      paddingHorizontal: spacing.l,
      paddingVertical: spacing.m,
      borderBottomWidth: 0.5,
      borderBottomColor: colors[theme].BORDER,
    },
    headerTitle: {
      fontSize: 24,
      color: colors[theme].PRIMARY,
    },
    listContainer: {
      padding: spacing.l,
    },
    notificationItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    notificationContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: spacing.m,
    },
    avatarContainer: {
      position: 'relative',
      marginRight: spacing.m,
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      borderWidth: 2,
      borderColor: colors[theme].BORDER,
    },
    iconBadge: {
      position: 'absolute',
      bottom: -4,
      right: -4,
      backgroundColor: colors[theme].GRAY_100,
      borderRadius: 12,
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: colors[theme].BORDER,
    },
    notificationInfo: {
      flex: 1,
      marginLeft: spacing.m,
    },
    username: {
      color: colors[theme].BLACK,
      fontSize: 14,
      marginBottom: 2,
    },
    action: {
      color: colors[theme].TEXT,
      fontSize: 14,
      marginBottom: 2,
    },
    timeAgo: {
      color: colors[theme].TEXT,
      fontSize: 12,
    },
    postImage: {
      width: 44,
      height: 44,
      borderRadius: 6,
    },
    centered: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default NotificationScreen;
