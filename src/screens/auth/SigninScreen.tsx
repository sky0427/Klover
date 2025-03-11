import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import {colors} from '@/constants/colors';
import InputField from '@/components/shared/InputField';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomIcon from '@/components/shared/CustomIcon';
import CustomText from '@/components/shared/CustomText';
import useLanguageStore from '@/store/useLanguageStore';
import {useTranslation} from 'react-i18next';
import CustomButton from '@/components/shared/CustomButton';

const SigninScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigate = useNavigation();
  const [headerVisible, setHeaderVisible] = useState(true);
  const {language, setLanguage} = useLanguageStore();
  const {t, i18n: i18nInstance} = useTranslation();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    // zustand 의 language 가 변경될때, i18next 의 language 도 함께 변경.
    i18nInstance.changeLanguage(language);
  }, [language, i18nInstance]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          <View style={styles.headerSection}>
            <CustomText
              fontWeight="bold"
              style={styles.title}
              numberOfLines={1}>
              {t('signinTitle')}
            </CustomText>
            <CustomText
              fontWeight="regular"
              style={styles.subTitle}
              numberOfLines={2}>
              {t('signinSubtitle')}
            </CustomText>
          </View>
          <InputField
            label="Email"
            icon={<CustomIcon name="MailFillSvg" size={20} color="#333" />}
          />
          <CustomButton label="Get Started" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].BACKGROUND,
      // backgroundColor: '#151312',
    },
    wrapper: {
      flex: 1,
      padding: Dimensions.get('screen').width * 0.05,
    },
    headerSection: {
      width: '80%',
      marginVertical: 36,
    },
    title: {
      fontSize: 28,
      letterSpacing: -(28 * 0.024),
      lineHeight: 28 * 1.4,
      marginBottom: 16,
    },
    subTitle: {
      fontSize: 16,
      letterSpacing: -(16 * 0.024),
      lineHeight: 16 * 1.4,
      color: colors[theme].TEXT,
    },
  });

export default SigninScreen;
