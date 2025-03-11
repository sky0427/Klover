import {useCallback, useMemo, useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {Button, Text, View} from 'react-native';

export default function CustomBottomSheet() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handleOpenPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
      }}>
      <Button title="Open" onPress={handleOpenPress} />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={{flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
          <Text>Awesome!</Text>
          <Button title="Close" onPress={handleClosePress} />
        </View>
      </BottomSheet>
    </View>
  );
}
