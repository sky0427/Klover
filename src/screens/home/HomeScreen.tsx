import CustomHeader from '@/components/shared/CustomHeader';
import CustomIcon from '@/components/shared/CustomIcon';
import CustomText from '@/components/shared/CustomText';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import SearchBar from '@/components/shared/SearchBar';
import Wrapper from '@/components/shared/Wrapper';
import {colors} from '@/constants/colors';
import {homeNavigations} from '@/constants/navigations';
import {useTourPostsQuery} from '@/hooks/react-query/useTourPostQueries';
import useUserLocation from '@/hooks/useUserLocation';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {HomeStackParamList} from '@/navigations/stack/HomeStackNavigator';
import useLanguageStore from '@/store/useLanguageStore';
import useThemeStore from '@/store/useThemeStore';
import {Area, ContentType, TourPostDto, TourPostSort} from '@/types';
import {ThemeMode} from '@/types/type';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const HomeScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<Navigation>();
  const {language} = useLanguageStore();
  const {userLocation} = useUserLocation();
  const [page, setPage] = React.useState(0);

  const {data, isLoading, error, refetch} = useTourPostsQuery({
    language,
    mapX: userLocation.longitude,
    mapY: userLocation.latitude,
    page: page,
    size: 10,
    sort: TourPostSort.Distance,
    // area: Area.SEOUL,
    // contentType: ContentType.Accommodation,
    // searchByTitle: false,
    // searchByOverview: false,
    // hasExotic: false,
    // hasHealing: false,
    // hasActive: false,
    // hasTraditional: false,
  });

  const handlePressSearch = () => {
    navigation.navigate(homeNavigations.SEARCH);
  };

  return (
    <ScreenWrapper>
      <CustomHeader
        leftIconName="MenuFillSvg"
        iconColor={colors[theme].BLACK}
        onLeftIconPress={() => navigation.openDrawer()}
      />

      <Wrapper mb={24}>
        <CustomText fontWeight="bold" style={styles.title}>
          Where do {'\n'}you want to go?
        </CustomText>
      </Wrapper>

      <Wrapper mb={24}>
        <Pressable style={[styles.searchContainer]} onPress={handlePressSearch}>
          <CustomText fontWeight="medium" style={styles.searchText}>
            Search ...
          </CustomText>
          <CustomIcon
            name="Search3LineSvg"
            size={20}
            color={colors[theme].PRIMARY}
          />
        </Pressable>
      </Wrapper>

      <FlatList
        data={data?.contents}
        keyExtractor={item => item.contentId.toString()}
        renderItem={({item}) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.addr1}</Text>
          </View>
        )}
      />
    </ScreenWrapper>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: Dimensions.get('screen').width * 0.05,
    },
    headerLabel: {
      fontSize: 18,
    },
    title: {
      fontSize: 26,
      color: colors[theme].BLACK,
      paddingLeft: 3,
    },
    searchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderWidth: 1.5,
      borderColor: colors[theme].PRIMARY,
      height: 56,
      paddingHorizontal: 12,
      alignItems: 'center',
      borderRadius: 16,
      backgroundColor: colors[theme].INPUT,
    },
    searchText: {
      flex: 1,
      fontSize: 14,
      color: colors[theme].TEXT,
    },
  });

export default HomeScreen;
