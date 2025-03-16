import {SearchParams} from '@/api';
import FilterChip from '@/components/home/filter/FilterChip';
import CustomHeader from '@/components/shared/CustomHeader';
import CustomIcon from '@/components/shared/CustomIcon';
import CustomText from '@/components/shared/CustomText';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import Wrapper from '@/components/shared/Wrapper';
import {colors} from '@/constants/colors';
import {useTourPostsInfiniteQuery} from '@/hooks/react-query/useTourPostQueries';
import useUserLocation from '@/hooks/useUserLocation';
import {HomeStackParamList} from '@/navigations/stack/HomeStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import {Area, ContentType, Country, TourPostSort} from '@/types';
import {ThemeMode} from '@/types/type';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

type Navigation = StackNavigationProp<HomeStackParamList>;

const FilterTourPostScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<Navigation>();
  const {userLocation} = useUserLocation();

  const [searchParams, setSearchParams] = useState<SearchParams>({
    language: Country.EN,
    mapX: userLocation.longitude,
    mapY: userLocation.latitude,
    sort: TourPostSort.Distance,
  });
  const [isAreaBottomSheetOpen, setIsAreaBottomSheetOpen] =
    useState<boolean>(false);
  const [isSortBottomSheetOpen, setIsSortBottomSheetOpen] =
    useState<boolean>(false);
  const [selectedArea, setSelectedArea] = useState<Area>(Area.SEOUL);
  const [sortType, setSortType] = useState<TourPostSort>(TourPostSort.Distance);
  const [contentType, setContentType] = useState<ContentType>();
  const [keyword, setKeyword] = useState<string>('');

  const areaBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const sortBottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['0%', '50%'], []);

  const {data, isLoading, error, refetch, isFetching} =
    useTourPostsInfiniteQuery(searchParams);

  const handlePresentAreaModalPress = useCallback(() => {
    areaBottomSheetModalRef.current?.present();
    setIsAreaBottomSheetOpen(true);
  }, []);

  const handleCloseAreaModalPress = useCallback(() => {
    areaBottomSheetModalRef.current?.close();
    setIsAreaBottomSheetOpen(false);
  }, []);

  const handlePresentSortModalPress = useCallback(() => {
    sortBottomSheetModalRef.current?.present();
    setIsSortBottomSheetOpen(true);
  }, []);

  const handleCloseSortModalPress = useCallback(() => {
    sortBottomSheetModalRef.current?.close();
    setIsSortBottomSheetOpen(false);
  }, []);

  const handleAreaSelect = (area: Area) => {
    setSelectedArea(area);
    setSearchParams({...searchParams, area: area});
    handleCloseAreaModalPress();
    refetch();
  };

  const handleSortSelect = (sort: TourPostSort) => {
    setSortType(sort);
    setSearchParams({...searchParams, sort: sort});
    handleCloseSortModalPress();
    refetch();
  };

  const handleContentTypeSelect = (type: ContentType) => {
    setContentType(type);
    setSearchParams({...searchParams, contentType: type});
    refetch();
  };

  const handleSearchByTitleToggle = () => {
    setSearchParams({
      ...searchParams,
      searchByTitle: !searchParams.searchByTitle,
    });
    refetch();
  };

  const handleSearchByOverviewToggle = () => {
    setSearchParams({
      ...searchParams,
      searchByOverview: !searchParams.searchByOverview,
    });
    refetch();
  };

  const handleHasExoticToggle = () => {
    setSearchParams({...searchParams, hasExotic: !searchParams.hasExotic});
    refetch();
  };

  const handleHasHealingToggle = () => {
    setSearchParams({...searchParams, hasHealing: !searchParams.hasHealing});
    refetch();
  };

  const handleHasActiveToggle = () => {
    setSearchParams({...searchParams, hasActive: !searchParams.hasActive});
    refetch();
  };

  const handleHasTraditionalToggle = () => {
    setSearchParams({
      ...searchParams,
      hasTraditional: !searchParams.hasTraditional,
    });
    refetch();
  };

  const sortOptions = [
    {label: 'near me', value: TourPostSort.Distance},
    {label: 'highest score', value: TourPostSort.Rating_Average},
    {label: 'most reviews', value: TourPostSort.Review_Count},
  ];

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <ScreenWrapper>
          {/*CustomHeader */}
          <CustomHeader onLeftIconPress={navigation.goBack}>
            <TouchableOpacity
              style={styles.header}
              onPress={handlePresentAreaModalPress}>
              <CustomText
                fontWeight="bold"
                style={{fontSize: 18, color: colors[theme].BLACK}}>
                {selectedArea}
              </CustomText>
              <CustomIcon
                name="DownsmFillSvg"
                size={24}
                color={colors[theme].BLACK}
              />
            </TouchableOpacity>
          </CustomHeader>

          <Wrapper>
            <FlatList
              data={sortOptions}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.value}
              renderItem={({item}) => (
                <FilterChip
                  label={item.label}
                  value={item.value}
                  isActive={searchParams.sort === item.value}
                  onPress={handleSortSelect}
                />
              )}
            />
          </Wrapper>

          {/* <CustomBanner content="We’ve prepared thematic categories for you. 😎" /> */}
        </ScreenWrapper>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  });

export default FilterTourPostScreen;
