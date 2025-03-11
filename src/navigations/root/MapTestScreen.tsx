import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {ThemeMode} from '@/types/type';
import useThemeStore from '@/store/useThemeStore';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import useUserLocation from '@/hooks/useUserLocation';
import useLocationStore from '@/store/useLocationStore';
import {MapStackParamList} from '../stack/MapStackNavigator';
import {MainDrawerParamList} from '../drawer/MainDrawerNavigator';
import useModal from '@/hooks/useModal';
import useMoveMapView, {INITIAL_DELTA} from '@/hooks/useMoveMapView';

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
  const [markerId, setMarkerId] = useState<number | null>(null);
  const markerModal = useModal();
  const filterOption = useModal();
  const {mapRef, moveMapView, handleChangeDelta} = useMoveMapView();

  const handlePressMarker = () => {};

  const handleLongPressMapView = () => {};

  const handlePressAddPost = () => {};

  const handlePressUserLocation = () => {};

  const handlePressSearch = () => {};

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={true}
        onLongPress={handleLongPressMapView}
        onRegionChangeComplete={handleChangeDelta}
        region={{
          ...userLocation,
          ...INITIAL_DELTA,
        }}></MapView>
    </>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });

export default MapTestScreen;
