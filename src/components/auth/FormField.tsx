import {colors} from '@/constants/colors';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import React, {ForwardedRef, forwardRef, useMemo, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import CustomIcon from '../shared/CustomIcon';
import CustomText from '../shared/CustomText';

interface FormFieldProps extends TextInputProps {
  label: string;
  value: string;
  style?: ViewStyle;
  error?: string | boolean | undefined;
  type?: 'email' | 'password' | 'default';
  handleChangeText: (text: string) => void;
  handleBlur?: (field: string) => void;
  onSubmitEditing?: () => void;
}

const FormField = forwardRef(
  (
    {
      label,
      value,
      style,
      error,
      type = 'default',
      handleChangeText,
      handleBlur,
      onSubmitEditing,
      ...props
    }: FormFieldProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    const {theme} = useThemeStore();
    const styles = styling(theme);
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const borderColor = useMemo(() => {
      if (error) {
        return colors[theme].DANGER;
      }
      return isFocused ? colors[theme].PRIMARY : colors[theme].BORDER;
    }, [isFocused, error, theme]);

    return (
      <View style={[styles.container, style]}>
        <CustomText fontWeight="semibold" style={styles.title}>
          {label}
        </CustomText>
        <View style={[styles.inputContainer, {borderColor}]}>
          <TextInput
            ref={ref}
            style={styles.input}
            value={value}
            placeholder={props.placeholder}
            placeholderTextColor={colors[theme].GRAY_500}
            onChangeText={handleChangeText}
            secureTextEntry={type === 'password' && !showPassword}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              if (handleBlur) {
                handleBlur(type);
              }
            }}
            onSubmitEditing={onSubmitEditing}
            autoCapitalize="none"
            spellCheck={false}
            autoCorrect={false}
            {...props}
          />

          {type === 'password' && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <CustomIcon
                name={!showPassword ? 'EyeCloseLineSvg' : 'EyeLineSvg'}
                size={24}
                color={isFocused ? colors[theme].PRIMARY : colors[theme].TEXT}
              />
            </TouchableOpacity>
          )}
        </View>
        {error && (
          <CustomText fontWeight="regular" style={styles.errorText}>
            {String(error)}
          </CustomText>
        )}
      </View>
    );
  },
);

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: 16,
    },
    title: {
      fontSize: 16,
      color: colors[theme].BLACK,
      marginBottom: 6,
    },
    inputContainer: {
      width: '100%',
      height: 56,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      backgroundColor: colors[theme].INPUT,
      borderRadius: 16,
      borderWidth: 2,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: colors[theme].GRAY_500,
    },
    errorText: {
      color: colors[theme].DANGER,
      marginTop: 6,
      marginLeft: 10,
      fontSize: 12,
    },
  });

export default FormField;
