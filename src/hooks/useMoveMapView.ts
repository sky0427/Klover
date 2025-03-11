import useLocationStore from '@/store/useLocationStore';
import {useEffect, useRef, useState} from 'react';
import MapView, {LatLng, Region} from 'react-native-maps';

type Delta = Pick<Region, 'latitudeDelta' | 'longitudeDelta'>;

export const INITIAL_DELTA = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

function useMoveMapView() {
  const mapRef = useRef<MapView | null>(null);
  const [regionDelta, setRegionDelta] = useState<Delta>(INITIAL_DELTA);
  const {moveLocation} = useLocationStore();

  const moveMapView = (coordinate: LatLng, delta?: Delta) => {
    mapRef.current?.animateToRegion({
      ...coordinate,
      ...(delta ?? regionDelta),
    });
  };

  const handleChangeDelta = (region: Region) => {
    const {latitudeDelta, longitudeDelta} = region;
    setRegionDelta({latitudeDelta, longitudeDelta});
  };

  useEffect(() => {
    moveLocation && moveMapView(moveLocation);
  });

  return {mapRef, moveMapView, handleChangeDelta};
}

export default useMoveMapView;
