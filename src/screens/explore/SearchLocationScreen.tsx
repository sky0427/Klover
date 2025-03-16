import SearchRegionResult from '@/components/map/SearchRegionResult';
import CustomIcon from '@/components/shared/CustomIcon';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import SearchBar from '@/components/shared/SearchBar';
import Wrapper from '@/components/shared/Wrapper';
import {colors} from '@/constants/colors';
import {sizes, spacing} from '@/constants/theme';
import useSearchLocation from '@/hooks/useSearchLocation';
import useUserLocation from '@/hooks/useUserLocation';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const SearchLocationScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const [keyword, setKeyword] = useState<string>('');
  const {userLocation} = useUserLocation();
  const navigation = useNavigation<Navigation>();
  const {regionInfo, pageParam, fetchNextPage, fetchPrevPage, hasNextPage} =
    useSearchLocation(keyword, userLocation);

  const handleChangeKeyword = (text: string) => {
    setKeyword(text);
  };

  return (
    <ScreenWrapper>
      <Wrapper mv={spacing.l} style={styles.container}>
        <CustomIcon
          name="LeftFillSvg"
          size={24}
          color={'white'}
          style={styles.backIcon}
          onPress={navigation.goBack}
        />
        <SearchBar
          onSearch={handleChangeKeyword}
          placeholder="search for a location..."
          FilterPress={() => {
            console.log(regionInfo);
          }}
        />
      </Wrapper>
      <Wrapper>
        <SearchRegionResult regionInfo={regionInfo} />
      </Wrapper>
    </ScreenWrapper>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.s,
    },
    backIcon: {
      width: 56,
      height: 56,
      backgroundColor: colors[theme].PRIMARY,
      borderRadius: sizes.radius,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default SearchLocationScreen;
