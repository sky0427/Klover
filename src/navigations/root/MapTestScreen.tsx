import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import MapView, {
  Callout,
  LongPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {ThemeMode} from '@/types/type';
import useThemeStore from '@/store/useThemeStore';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import useUserLocation from '@/hooks/useUserLocation';
import useLocationStore from '@/store/useLocationStore';
import {MapStackParamList} from '../stack/MapStackNavigator';
import {MainDrawerParamList} from '../drawer/MainDrawerNavigator';
import useModal from '@/hooks/useModal';
import useMoveMapView, {INITIAL_DELTA} from '@/hooks/useMoveMapView';
import usePermission from '@/hooks/usePermission';
import useLegendStorage from '@/hooks/useLegendStorage';
import CustomIcon from '@/components/shared/CustomIcon';
import {colors} from '@/constants/colors';
import {spacing} from '@/constants/theme';
import {useTourPostsQuery} from '@/hooks/react-query/useTourPostQueries';
import useLanguageStore from '@/store/useLanguageStore';
import {TourPostDto, TourPostSort} from '@/types';
import CustomMarker from '@/components/map/CustomMarker';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const MapTestScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  const {userLocation, isUserLocationError} = useUserLocation();
  const {selectLocation, setSelectLocation} = useLocationStore();
  const {language} = useLanguageStore();
  const [page, setPage] = React.useState(0);
  const [markerId, setMarkerId] = useState<number | null>(null);
  const markerModal = useModal();
  const filterOption = useModal();
  const {mapRef, moveMapView, handleChangeDelta} = useMoveMapView();
  const legend = useLegendStorage();
  usePermission('LOCATION');

  const {data, isLoading, error, refetch} = useTourPostsQuery({
    language,
    mapX: userLocation.longitude,
    mapY: userLocation.latitude,
    page: page,
    size: 20,
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

  const markers = data ? data?.contents : [];

  const handlePressMarker = () => {};

  const handleLongPressMapView = ({nativeEvent}: LongPressEvent) => {
    setSelectLocation(nativeEvent.coordinate);
  };

  const handlePressAddPost = () => {};

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      Toast.show({
        type: 'error',
        text1: '위치 권한을 허용해주세요.',
        position: 'bottom',
      });
      return;
    }
    moveMapView(userLocation);
  };

  const handlePressSearch = () => {};

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        onLongPress={handleLongPressMapView}
        onRegionChangeComplete={handleChangeDelta}
        region={{
          ...userLocation,
          ...INITIAL_DELTA,
        }}>
        {markers?.map((item: TourPostDto) => (
          <CustomMarker
            key={item.contentId}
            color={'PURPLE'}
            score={4}
            coordinate={{latitude: item.mapY, longitude: item.mapX}}
          />
        ))}
        {selectLocation && (
          <Callout>
            <Marker coordinate={selectLocation} />
          </Callout>
        )}
      </MapView>

      <Pressable
        style={[styles.drawerButton, {top: inset.top || 20}]}
        onPress={() => navigation.openDrawer()}>
        <CustomIcon name="MenuFillSvg" size={24} color={colors[theme].WHITE} />
      </Pressable>

      <View style={[styles.buttonList]}>
        <Pressable style={styles.mapButton} onPress={handlePressSearch}>
          <CustomIcon name="AddFillSvg" size={24} color={colors[theme].WHITE} />
        </Pressable>
        <Pressable style={styles.mapButton} onPress={handlePressSearch}>
          <CustomIcon
            name="Search3LineSvg"
            size={24}
            color={colors[theme].WHITE}
          />
        </Pressable>
        <Pressable style={styles.mapButton} onPress={handlePressSearch}>
          <CustomIcon
            name="Settings6LineSvg"
            size={24}
            color={colors[theme].WHITE}
          />
        </Pressable>
        <Pressable style={styles.mapButton} onPress={handlePressSearch}>
          <CustomIcon
            name="LocationFillSvg"
            size={24}
            color={colors[theme].WHITE}
          />
        </Pressable>
      </View>
    </>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerButton: {
      position: 'absolute',
      left: 0,
      paddingVertical: 10,
      paddingHorizontal: 12,
      backgroundColor: colors[theme].PRIMARY,
      borderTopRightRadius: 50,
      borderBottomRightRadius: 50,
      shadowColor: colors[theme].PRIMARY,
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.5,
      elevation: 4,
    },
    buttonList: {
      position: 'absolute',
      right: spacing.l,
      bottom: spacing.xxl,
    },
    mapButton: {
      backgroundColor: colors[theme].PRIMARY,
      marginVertical: 5,
      height: 48,
      width: 48,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      shadowColor: colors[theme].PRIMARY,
      shadowOffset: {width: 1, height: 2},
      shadowOpacity: 0.5,
      elevation: 2,
    },
  });

export default MapTestScreen;
