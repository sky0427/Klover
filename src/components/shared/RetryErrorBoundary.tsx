import {colors} from '@/constants/colors';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import {useQueryErrorResetBoundary} from '@tanstack/react-query';
import React, {PropsWithChildren} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from './CustomButton';

const RetryErrorBoundary = ({children}: PropsWithChildren) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {reset} = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({resetErrorBoundary}) => (
        <View style={styles.container}>
          <Text>Please try again in a moment.</Text>
          <Text>Failed to process your request.</Text>
          <CustomButton
            label="Retry"
            variant="outlined"
            onPress={resetErrorBoundary}
          />
        </View>
      )}>
      {children}
    </ErrorBoundary>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      backgroundColor: colors[theme].BACKGROUND,
    },
    titleText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors[theme].GRAY_700,
    },
    descriptionText: {
      fontSize: 15,
      color: colors[theme].TEXT,
    },
  });

export default RetryErrorBoundary;
