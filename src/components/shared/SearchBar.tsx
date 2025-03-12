import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import CustomIcon from './CustomIcon';
import {colors} from '@/constants/colors';

interface SearchBarProps extends TextInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  FilterPress?: () => void;
  SearchPress?: () => void;
}

const SearchBar = ({
  placeholder,
  value,
  onChangeText,
  FilterPress,
  SearchPress,
  ...props
}: SearchBarProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <Pressable onPress={SearchPress}>
        <CustomIcon
          name="Search3LineSvg"
          size={24}
          color={colors[theme].PRIMARY}
        />
      </Pressable>
      <TextInput
        style={styles.text}
        autoFocus={true}
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="default"
        returnKeyType="search"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        spellCheck={false}
        clearButtonMode="while-editing"
        placeholderTextColor={colors[theme].GRAY_500}
        {...props}
      />
      <Pressable onPress={FilterPress}>
        <CustomIcon
          name="Settings6LineSvg"
          size={24}
          color={colors[theme].PRIMARY}
        />
      </Pressable>
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 16,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderWidth: 1.5,
      backgroundColor: colors[theme].GRAY_100,
      borderColor: colors[theme].PRIMARY,
      height: 56,
      gap: 12,
    },
    text: {
      flex: 1,
      fontSize: 14,
      color: colors[theme].TEXT,
    },
  });

export default SearchBar;
