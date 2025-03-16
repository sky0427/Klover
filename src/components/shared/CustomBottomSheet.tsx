import BottomSheet, {
  BottomSheetView,
  BottomSheetProps as RNBottomSheetProps,
} from '@gorhom/bottom-sheet';
import React, {
  ReactNode,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

interface BottomSheetProps extends RNBottomSheetProps {
  children: ReactNode;
  snapPoints: string[];
}

export type BottomSheetRef = {
  expand: () => void;
  collapse: () => void;
  close: () => void;
  snapToIndex: (index: number) => void;
};

const CustomBottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (props: BottomSheetProps, ref) => {
    const {children, snapPoints, ...rest} = props;
    const bottomSheetRef = useRef<BottomSheet>(null);

    useImperativeHandle(ref, () => ({
      expand: () => {
        bottomSheetRef.current?.expand();
      },
      collapse: () => {
        bottomSheetRef.current?.collapse();
      },
      close: () => {
        bottomSheetRef.current?.close();
      },
      snapToIndex: (index: number) => {
        bottomSheetRef.current?.snapToIndex(index);
      },
    }));

    const handleSheetChanges = useCallback((index: number) => {
      console.log('handleSheetChanges', index);
    }, []);

    const handleOutsidePress = () => {
      bottomSheetRef.current?.close();
    };

    return (
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={{flex: 1, backgroundColor: 'transparent'}}>
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            {...rest}>
            <BottomSheetView style={styles.contentContainer}>
              {children}
            </BottomSheetView>
          </BottomSheet>
        </View>
      </TouchableWithoutFeedback>
    );
  },
);

CustomBottomSheet.displayName = 'CustomBottomSheet';

const styles = StyleSheet.create({
  contentContainer: {
    padding: 36,
    alignItems: 'center',
  },
});

export default CustomBottomSheet;
