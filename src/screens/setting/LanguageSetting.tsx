import {colors} from '@/constants/colors';
import useMemberUpdateMutation from '@/hooks/react-query/useMemberMutations';
import useThemeStore from '@/store/useThemeStore';
import {Country} from '@/types';
import {ThemeMode} from '@/types/type';
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const LanguageSetting = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = ['한국어', 'English', '日本語', '中文'];

  const handleLanguageSelection = (language: string) => {
    setSelectedLanguage(language);
    console.log(selectedLanguage);
  };

  const {mutate} = useMemberUpdateMutation();
  const {theme} = useThemeStore();

  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Language</Text>

      {languages.map(language => (
        <TouchableOpacity
          key={language}
          style={[
            styles.button,
            selectedLanguage === language && styles.selectedButton,
          ]}
          onPress={() => handleLanguageSelection(language)}
          activeOpacity={1}>
          <Text
            style={
              selectedLanguage === language
                ? styles.selectedButtonText
                : styles.buttonText
            }>
            {language}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.completedButton}
        onPress={() => {
          switch (selectedLanguage) {
            case '한국어':
              mutate({nickname: '', country: Country.KO, image: undefined});
              break;
            case 'English':
              mutate({nickname: '', country: Country.EN, image: undefined});
              break;
            case '日本語':
              mutate({nickname: '', country: Country.JA, image: undefined});
              break;
            case '中文':
              mutate({nickname: '', country: Country.ZH, image: undefined});
              break;
            default:
              break;
          }
        }}>
        <Text style={styles.completedButtonText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: colors[theme].BACKGROUND, // 배경색 추가
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colors[theme].BLACK,
      textAlign: 'center',
    },
    button: {
      width: '100%',
      padding: 15,
      marginVertical: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors[theme].GRAY_500,
      alignItems: 'center',
      backgroundColor: colors[theme].GRAY_100, // 버튼 배경색 추가
    },
    selectedButton: {
      backgroundColor: colors[theme].WHITE, // 선택된 버튼 배경색 변경
      borderColor: colors[theme].PURPLE_500, // 선택된 버튼 테두리 색 변경
    },
    buttonText: {
      fontSize: 18,
      color: colors[theme].GRAY_700, // 기본 버튼 텍스트 색상
    },
    selectedButtonText: {
      fontSize: 18,
      color: colors[theme].PURPLE_500, // 선택된 버튼 텍스트 색상 변경
    },
    completedButton: {
      width: '100%',
      padding: 15,
      marginTop: 20,
      borderRadius: 8,
      backgroundColor: colors[theme].PURPLE_500,
      alignItems: 'center',
    },
    completedButtonText: {
      fontSize: 18,
      color: colors[theme].WHITE,
    },
  });
export default LanguageSetting;
