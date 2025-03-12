import {colors} from '@/constants/colors';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import CustomIcon from '../shared/CustomIcon';
import CustomText from '../shared/CustomText';

interface FormFieldProps {
  title: string;
  value: string;
  autoFocus?: boolean;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: ViewStyle;
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  autoFocus,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = isFocused ? colors[theme].PRIMARY : colors[theme].BORDER;

  return (
    <View style={[styles.container, otherStyles]}>
      <CustomText fontWeight="semibold" style={styles.title}>
        {title}
      </CustomText>
      <View style={[styles.inputContainer, {borderColor}]}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors[theme].GRAY_500}
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          onFocus={() => [setIsFocused(true)]}
          onBlur={() => setIsFocused(false)}
          autoFocus={autoFocus}
          {...props}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <CustomIcon
              name={!showPassword ? 'EyeCloseLineSvg' : 'EyeLineSvg'}
              size={24}
              color={isFocused ? colors[theme].PRIMARY : colors[theme].TEXT}
            />
          </TouchableOpacity>
        )}

        {title === 'Confirm Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <CustomIcon
              name={!showPassword ? 'EyeCloseLineSvg' : 'EyeLineSvg'}
              size={24}
              color={isFocused ? colors[theme].PRIMARY : colors[theme].TEXT}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
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
  });

export default FormField;
