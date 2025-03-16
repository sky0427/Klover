import {colors} from '@/constants/colors';
import useDebounce from '@/hooks/useDebounce';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import CustomIcon from './CustomIcon';

interface SearchBarProps extends TextInputProps {
  placeholder?: string;
  onSearch: (text: string) => void;
  FilterPress?: () => void;
}

const SearchBar = ({
  placeholder,
  onSearch,
  FilterPress,
  ...props
}: SearchBarProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const [searchText, setSearchText] = useState('');

  const debouncedSearchText = useDebounce(searchText, 500);

  useEffect(() => {
    onSearch(debouncedSearchText);
  }, [debouncedSearchText, onSearch]);

  const handleTextChange = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const handleSearchPress = useCallback(() => {
    onSearch(searchText);
  }, [searchText, onSearch]);

  return (
    <View style={styles.container}>
      <CustomIcon
        name="Search3LineSvg"
        size={24}
        color={colors[theme].PRIMARY}
        onPress={handleSearchPress}
      />

      <TextInput
        style={styles.text}
        autoFocus={true}
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="default"
        returnKeyType="search"
        placeholder={placeholder}
        value={searchText}
        onChangeText={handleTextChange}
        spellCheck={false}
        clearButtonMode="while-editing"
        placeholderTextColor={colors[theme].GRAY_500}
        {...props}
      />

      <CustomIcon
        name="Settings6LineSvg"
        size={24}
        color={colors[theme].PRIMARY}
        onPress={FilterPress}
      />
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
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
