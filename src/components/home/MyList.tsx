import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import React from 'react';
import {useAreaPostInfiniteQuery} from '@/hooks/react-query/useTourPostQueries';

const MyList = ({language, areaCode}: {language: string; areaCode: string}) => {
  const {
    data,
    isLoading,
    isFetching,
    isFetched,
    hasNextPage,
    fetchPreviousPage,
    fetchNextPage,
    isError,
    error,
    isFetchingNextPage,
  } = useAreaPostInfiniteQuery(language, areaCode);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <FlatList
      data={data?.pages.flatMap(page => page.contents || [])}
      renderItem={({item}) => (
        <View>
          <Text>{item.title}</Text>
        </View>
      )}
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator />
        ) : hasNextPage ? (
          <Text>Load More ...</Text>
        ) : (
          <Text>No more data.</Text>
        )
      }>
      <Text>MyList</Text>
    </FlatList>
  );
};

export default MyList;
