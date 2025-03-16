import CommPostList from '@/components/community/CommPostList';
import CustomIcon from '@/components/shared/CustomIcon';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import SearchBar from '@/components/shared/SearchBar';
import Wrapper from '@/components/shared/Wrapper';
import {colors} from '@/constants/colors';
import {sizes, spacing} from '@/constants/theme';
import {useSearchCommPostInfiniteQuery} from '@/hooks/react-query/useCommPostQueries';
import useUserLocation from '@/hooks/useUserLocation';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {CommStackParamList} from '@/navigations/stack/CommStackNavigator';
import useLanguageStore from '@/store/useLanguageStore';
import useThemeStore from '@/store/useThemeStore';
import useAuthStore from '@/store/zustand/useAuthStore';
import {TourPostSort} from '@/types';
import {ThemeMode} from '@/types/type';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<CommStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const CommHomeScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {user} = useAuthStore();
  const {t} = useTranslation();
  const {language} = useLanguageStore();
  const {userLocation} = useUserLocation();

  const [searchKeyword, setSearchKeyword] = useState('');

  const navigation = useNavigation<Navigation>();

  const handleSearch = useCallback((term: string) => {
    setSearchKeyword(term);
  }, []);

  const commPostListProps = useMemo(
    () => ({
      keyword: searchKeyword,
      sort: 'DISTANCE',
      language: language,
      content: true,
      nickname: true,
      mapX: userLocation.longitude,
      mapY: userLocation.latitude,
    }),
    [searchKeyword, language, userLocation.longitude, userLocation.latitude],
  );

  return (
    <ScreenWrapper>
      <Wrapper
        pv={spacing.l}
        style={{
          width: '100%',
          flexDirection: 'row',
          gap: spacing.s,
        }}>
        <CustomIcon
          name="MenuFillSvg"
          size={24}
          color={colors[theme].UNCHANGE_WHITE}
          style={{
            width: 56,
            height: 56,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors[theme].PRIMARY,
            borderRadius: sizes.radius,
          }}
          onPress={navigation.openDrawer}
        />
        <SearchBar onSearch={handleSearch} placeholder="search ..." />
      </Wrapper>

      <CommPostList {...commPostListProps} />
    </ScreenWrapper>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });

export default CommHomeScreen;
