import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {ThemeMode} from '@/types/type';
import useThemeStore from '@/store/useThemeStore';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import useUserLocation from '@/hooks/useUserLocation';
import useLocationStore from '@/store/useLocationStore';

// type Navigation = CompositeNavigationProp<
//   StackNavigationProp<>,
//   DrawerNavigationProp<>
// >;

const MapTestScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const inset = useSafeAreaInsets();
  // const navigation = useNavigation<Navigation>();
  const {} = useUserLocation();
  const {} = useLocationStore();

  return (
    <>
      <MapView
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={true}
      />
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
