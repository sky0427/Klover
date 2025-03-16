import {sizes, spacing} from '@/constants/theme';
import {useSearchCommPostInfiniteQuery} from '@/hooks/react-query/useCommPostQueries';
import {CommStackParamList} from '@/navigations/stack/CommStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

interface CommPostListProps {
  keyword: string;
  sort: string | undefined;
  language: string;
  content: boolean;
  nickname: boolean;
  mapX: number;
  mapY: number;
}

const CARD_WIDTH = sizes.width / 3;
const CARD_HEIGHT = sizes.width / 3;

const CommPostList: React.FC<CommPostListProps> = ({
  keyword,
  sort,
  language,
  content,
  nickname,
  mapX,
  mapY,
}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {
    data,
    isError,
    error,
    isLoading,
    isFetching,
    isFetched,
    hasNextPage,
    fetchPreviousPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSearchCommPostInfiniteQuery(
    keyword,
    sort,
    language,
    content,
    nickname,
    mapX,
    mapY,
  );

  const navigation = useNavigation<StackNavigationProp<CommStackParamList>>();

  return (
    <FlashList
      data={data?.pages.flatMap(page => page.contents || [])}
      keyExtractor={item => String(item.id)}
      numColumns={3}
      contentContainerStyle={styles.container}
      estimatedItemSize={500}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            style={styles.card}
            onPress={() => console.log(item)}>
            <View style={styles.imageBox}>
              <Image source={{uri: item.imageUrls[0]}} style={styles.image} />
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      paddingLeft: sizes.width * 0.05,
    },
    cardContainer: {
      marginLeft: spacing.l,
      marginBottom: spacing.l,
    },
    card: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      marginLeft: spacing.l,
      marginBottom: spacing.l,
    },
    imageBox: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      borderRadius: sizes.radius,
      overflow: 'hidden',
    },
    image: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      resizeMode: 'cover',
    },
  });

export default CommPostList;
