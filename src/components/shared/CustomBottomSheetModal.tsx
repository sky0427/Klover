import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProps as RNBottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import React, {
  ReactNode,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

interface BottomSheetModalProps extends RNBottomSheetModalProps {
  children: ReactNode;
}

export type BottomSheetModalRef = {
  present: () => void;
  dismiss: () => void;
};

const CustomBottomSheetModal = forwardRef<
  BottomSheetModalRef,
  BottomSheetModalProps
>((props: BottomSheetModalProps, ref) => {
  const {children, ...rest} = props;
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(ref, () => ({
    present: () => {
      bottomSheetModalRef.current?.present();
    },
    dismiss: () => {
      bottomSheetModalRef.current?.dismiss();
    },
  }));

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleOutsidePress = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
          {...rest}>
          <BottomSheetView style={styles.contentContainer}>
            {children}
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </TouchableWithoutFeedback>
  );
});

CustomBottomSheetModal.displayName = 'CustomBottomSheetModal';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default CustomBottomSheetModal;
