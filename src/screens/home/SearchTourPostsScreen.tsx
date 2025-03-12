import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useTourSearchStore} from '@/store/zustand/useTourSearchStore';
import {useDebounce} from '@/hooks/useDebounce';
import {useTourPostsInfiniteQuery} from '@/hooks/react-query/useTourPostQueries';
import {Country, TourPostSort} from '@/types';
import {} from 'react-native-maps';
import SearchBar from '@/components/shared/SearchBar';
import useUserLocation from '@/hooks/useUserLocation';
import {ThemeMode} from '@/types/type';
import useThemeStore from '@/store/useThemeStore';
import useLanguageStore from '@/store/useLanguageStore';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import Wrapper from '@/components/shared/Wrapper';
import CustomHeader from '@/components/shared/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import CustomText from '@/components/shared/CustomText';
import {colors} from '@/constants/colors';
import CustomCard from '@/components/shared/CustomCard';

const SearchTourPostsScreen: React.FC = () => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => styling(theme), [theme]);
  const navigation = useNavigation();
  const {setKeyword} = useTourSearchStore();
  const {language} = useLanguageStore();
  const {userLocation} = useUserLocation();
  const [localKeyword, setLocalKeyword] = useState('');
  const [searchByTitle, setSearchByTitle] = useState(true);
  const [searchByOverview, setSearchByOverview] = useState(false);

  const debouncedKeyword = useDebounce(localKeyword, 500);

  const queryOptions = useMemo(
    () => ({
      language,
      mapX: userLocation.longitude,
      mapY: userLocation.latitude,
      size: 15,
      sort: TourPostSort.Distance,
      keyword: debouncedKeyword,
      searchByTitle,
      searchByOverview,
    }),
    [language, userLocation, debouncedKeyword, searchByTitle, searchByOverview],
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
    isError,
    error,
    refetch,
  } = useTourPostsInfiniteQuery(queryOptions);

  const handleSearch = () => {
    refetch();
  };

  useEffect(() => {
    setKeyword(debouncedKeyword);
  }, [debouncedKeyword, setKeyword, refetch]);

  const handleFilterPress = () => {
    console.log('filter pressed!');
  };

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const isEmpty = data?.pages.every(p => p.contents.length === 0);

  const renderItem = useCallback(({item}: any) => {
    return <CustomCard data={item} />;
  }, []);

  if (isLoading) {
    return (
      <View style={styles.initialLoading}>
        <ActivityIndicator size={'large'} color={colors[theme].PRIMARY} />
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <ScreenWrapper>
      <CustomHeader
        leftIconName="LeftFillSvg"
        iconColor={colors[theme].BLACK}
        onLeftIconPress={() => navigation.goBack()}>
        <CustomText fontWeight="semibold" style={styles.headerLabel}>
          Search
        </CustomText>
      </CustomHeader>

      <Wrapper mb={24}>
        <SearchBar
          placeholder="search for a tour post..."
          SearchPress={handleSearch}
          FilterPress={handleFilterPress}
          onChangeText={setLocalKeyword}
          onSubmitEditing={handleSearch}
          value={localKeyword}
        />
      </Wrapper>

      <Wrapper>
        {isEmpty ? (
          <View style={styles.noResultsContainer}>
            <CustomText>No results found.</CustomText>
          </View>
        ) : (
          <FlatList
            data={data?.pages.flatMap(p => p.contents)}
            keyExtractor={item => item.contentId.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            contentContainerStyle={styles.flatList}
          />
        )}
      </Wrapper>
    </ScreenWrapper>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: Dimensions.get('screen').width * 0.05,
    },
    headerLabel: {
      fontSize: 16,
      color: colors[theme].BLACK,
    },
    flatList: {
      paddingBottom: 200,
    },
    initialLoading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingContainer: {
      paddingVertical: 20,
      alignItems: 'center',
    },
    noResultsContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20,
    },
  });

export default SearchTourPostsScreen;
