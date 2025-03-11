import {View, Text, FlatList, StyleSheet, Dimensions} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useTourSearchStore} from '@/store/zustand/useTourSearchStore';
import {useDebounce} from '@/hooks/useDebounce';
import {useSearchTourPosts} from '@/hooks/react-query/useTourPostQueries';
import {Country, TourPostSort} from '@/types';
import SearchBar from '@/components/shared/SearchBar';
import useUserLocation from '@/hooks/useUserLocation';
import {ThemeMode} from '@/types/type';
import useThemeStore from '@/store/useThemeStore';
import useLanguageStore from '@/store/useLanguageStore';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import Wrapper from '@/components/shared/Wrapper';

const SearchTourPostsScreen: React.FC = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {setKeyword} = useTourSearchStore();
  const {language} = useLanguageStore();
  const {userLocation} = useUserLocation();
  const [localKeyword, setLocalKeyword] = useState('');
  const [searchByTitle, setSearchByTitle] = useState(true);
  const [searchByOverview, setSearchByOverview] = useState(true);

  const debouncedKeyword = useDebounce(localKeyword, 500);

  const {data, isLoading, isError, error, refetch} = useSearchTourPosts({
    keyword: debouncedKeyword,
    language,
    searchByTitle,
    searchByOverview,
    mapX: userLocation?.longitude,
    mapY: userLocation?.latitude,
    sort: TourPostSort.Distance,
  });

  const handleSearch = useCallback(() => {
    if (localKeyword.trim() !== '') {
      refetch();
      setLocalKeyword('');
    }
  }, [localKeyword, refetch]);

  const handleFilterPress = () => {};

  useEffect(() => {
    console.log(data);
    console.log(userLocation);
  });

  useEffect(() => {
    if (debouncedKeyword) {
      setKeyword(debouncedKeyword);
    }
  }, [debouncedKeyword, setKeyword]);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
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
      <Wrapper>
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
        {data && (
          <FlatList
            data={data.data?.contents}
            keyExtractor={item => item.contentId.toString()}
            renderItem={({item}) => (
              <View>
                <Text>{item.title}</Text>
                <Text>{item.addr1}</Text>
              </View>
            )}
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
    bottomSheetContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#333',
    },
  });

export default SearchTourPostsScreen;
