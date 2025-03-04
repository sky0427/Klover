import {LatLng, MapMarkerProps} from 'react-native-maps';

declare module 'react-native-maps' {
  export interface MyMapMarkerProps extends MapMarkerProps {
    coordinate?: LatLng;
  }
}

type MarkerColor = 'RED' | 'YELLOW' | 'GREEN' | 'BLUE' | 'PURPLE';
