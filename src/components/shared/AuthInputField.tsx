import {colors} from '@/constants/colors';
import * as Icons from '@/constants/icons';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import {ReactNode, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import CustomIcon from './CustomIcon';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  icon?: ReactNode;
  label?: string;
}

interface AuthFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
}

const deviceHeight = Dimensions.get('screen').height;

const AuthInputField = ({icon = 'AddFillSvg', ...props}: AuthFieldProps) => {
  const {theme} = useThemeStore();
  const [isFocused, setIsFocused] = useState(false);
  const styles = styling(theme);

  return (
    <View style={[styles.container, isFocused && styles.focused]}>
      <CustomIcon
        name={icon}
        color={isFocused ? colors[theme].PURPLE_500 : colors[theme].GRAY_500}
      />
      <TextInput
        placeholderTextColor={colors[theme].GRAY_500}
        style={styles.input}
        placeholder={isFocused ? '' : props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType ?? 'default'}
        secureTextEntry={props.secureTextEntry ?? false}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
        autoCapitalize="none"
        spellCheck={false}
        autoCorrect={false}
      />
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors[theme].GRAY_100,
      borderRadius: 10,
      marginBottom: 20,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: colors[theme].BLACK,
    },
    focused: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors[theme].WHITE,
      borderRadius: 10,
      marginBottom: 20,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: colors[theme].PURPLE_500,
    },
    input: {
      flex: 1,
      height: 50,
      fontSize: 16,
      color: colors[theme].BLACK,
    },
  });

export default AuthInputField;
