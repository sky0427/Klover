import {colors} from '@/constants/colors';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import {mergeRefs} from '@/utils/common';
import React, {ForwardedRef, ReactNode, useRef} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import CustomText from './CustomText';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  icon?: ReactNode;
  label?: string;
}

const deviceHeight = Dimensions.get('screen').height;

const InputField = (
  {
    disabled = false,
    error,
    touched,
    icon = null,
    label,
    ...props
  }: InputFieldProps,
  ref?: ForwardedRef<TextInput>,
) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const innerRef = useRef<TextInput | null>(null);

  const handlePressInput = () => {
    innerRef.current?.focus();
  };

  return (
    <Pressable
      style={[
        styles.container,
        disabled && styles.disabled,
        props.multiline && styles.multiLine,
        touched && Boolean(error) && styles.inputError,
      ]}
      onPress={handlePressInput}>
      <CustomText fontWeight="semibold" style={styles.label}>
        {label}
      </CustomText>
      <View style={Boolean(icon) && styles.innerContainer}>
        {icon}
        <TextInput
          ref={ref ? mergeRefs(innerRef, ref) : innerRef}
          editable={!disabled}
          placeholderTextColor={colors[theme].GRAY_500}
          style={[styles.input, disabled && styles.disabled]}
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          {...props}
        />
      </View>
      {touched && Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </Pressable>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    multiLine: {
      paddingBottom: deviceHeight > 700 ? 45 : 30,
    },
    label: {
      fontSize: 16,
      color: colors[theme].GRAY_700,
      marginBottom: 6,
      marginLeft: 3,
    },
    input: {
      fontSize: 16,
      color: colors[theme].BLACK,
      padding: 0,
    },
    innerContainer: {
      borderWidth: 1,
      borderColor: colors[theme].GRAY_500,
      borderRadius: 12,
      padding: deviceHeight > 700 ? 15 : 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    disabled: {
      backgroundColor: colors[theme].GRAY_100,
      color: colors[theme].GRAY_700,
    },
    inputError: {
      borderWidth: 1,
      borderColor: colors[theme].DANGER,
    },
    error: {
      color: colors[theme].DANGER,
      fontSize: 12,
      paddingTop: 5,
    },
  });

export default InputField;
