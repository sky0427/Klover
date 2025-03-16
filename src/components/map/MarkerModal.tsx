import React from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';

import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';

import {colors} from '@/constants/colors';
import {useCommPostDetailQuery} from '@/hooks/react-query/useCommPostQueries';
import {CommStackParamList} from '@/navigations/stack/CommStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import {StackNavigationProp} from '@react-navigation/stack';
import CustomIcon from '../shared/CustomIcon';

interface MarkerModalProps {
  markerId: number | null;
  isVisible: boolean;
  hide: () => void;
}

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<MainDrawerParamList>,
  StackNavigationProp<CommStackParamList>
>;

function MarkerModal({markerId, isVisible, hide}: MarkerModalProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<Navigation>();
  const {
    data: post,
    isPending,
    isError,
  } = useCommPostDetailQuery(markerId as number);

  if (isPending || isError) {
    return <></>;
  }

  //   const handlePressModal = () => {
  //     navigation.navigate(mainNavigation.COMMUNITY, {
  //       screen: commNavigations.COMM_HOME,
  //       params: {
  //         screen: commNavigations.COMM_DETAIL,
  //         params: {
  //           id: post.id,
  //         },
  //         initial: false,
  //       },
  //     });
  //
  //     hide();
  //   };

  return (
    <Modal visible={isVisible} transparent={true} animationType={'slide'}>
      <SafeAreaView style={[styles.optionBackground]} onTouchEnd={hide}>
        <Pressable style={styles.cardContainer} onPress={() => {}}>
          <View style={styles.cardInner}>
            <View style={styles.cardAlign}>
              {post.imageUrls.length > 0 && (
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: post.imageUrls[0],
                    }}
                    resizeMode="cover"
                  />
                </View>
              )}
              {post.imageUrls.length === 0 && (
                <View
                  style={[styles.imageContainer, styles.emptyImageContainer]}>
                  {/* <CustomMarker color={post.color} score={post.score} /> */}
                </View>
              )}
              <View style={styles.infoContainer}>
                <View style={styles.addressContainer}>
                  <CustomIcon
                    name="LocationLineSvg"
                    size={10}
                    color={colors[theme].GRAY_500}
                  />
                  <Text
                    style={styles.addressText}
                    ellipsizeMode="tail"
                    numberOfLines={1}>
                    {/* {post.address} */}
                  </Text>
                </View>
                {/* <Text style={styles.titleText}>{post.title}</Text>
                <Text style={styles.dateText}>
                  {getDateWithSeparator(post.date, '.')}
                </Text> */}
              </View>
            </View>

            <View style={styles.nextButton}>
              <CustomIcon
                name="LeftFillSvg"
                size={20}
                color={colors[theme].BLACK}
              />
            </View>
          </View>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    optionBackground: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    cardContainer: {
      backgroundColor: colors[theme].WHITE,
      margin: 10,
      borderRadius: 20,
      shadowColor: colors[theme].BLACK,
      shadowOffset: {width: 3, height: 3},
      shadowOpacity: 0.2,
      elevation: 1,
      borderColor: colors[theme].GRAY_500,
      borderWidth: 1.5,
    },
    cardInner: {
      padding: 20,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    imageContainer: {
      width: 70,
      height: 70,
      borderRadius: 35,
    },
    emptyImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors[theme].GRAY_100,
      borderRadius: 35,
      borderWidth: 1,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 35,
    },
    cardAlign: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    infoContainer: {
      width: Dimensions.get('screen').width / 2,
      marginLeft: 15,
      gap: 5,
    },
    addressContainer: {
      gap: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    addressText: {
      color: colors[theme].GRAY_500,
      fontSize: 10,
    },
    titleText: {
      color: colors[theme].BLACK,
      fontSize: 15,
      fontWeight: 'bold',
    },
    dateText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: colors[theme].PRIMARY,
    },
    nextButton: {
      width: 40,
      height: 40,
      borderRadius: 40,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  });

export default MarkerModal;
