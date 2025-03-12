import FormField from '@/components/auth/FormField';
import CustomButton from '@/components/shared/CustomButton';
import CustomText from '@/components/shared/CustomText';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import Wrapper from '@/components/shared/Wrapper';
import {colors} from '@/constants/colors';
import {authNavigations} from '@/constants/navigations';
import useLanguageStore from '@/store/useLanguageStore';
import useThemeStore from '@/store/useThemeStore';
import {SignupRequest} from '@/types/auth';
import {ThemeMode} from '@/types/type';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SignupScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation();
  const {language} = useLanguageStore();
  const {t} = useTranslation();
  const [form, setForm] = useState<SignupRequest>({
    email: '',
    nickname: '',
    password: '',
    checkPassword: '',
  });

  return (
    <ScreenWrapper style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>
        <Wrapper mb={36}>
          <CustomText fontWeight="bold" style={styles.title}>
            {t('signupTitle', {language})}
          </CustomText>
        </Wrapper>
        <Wrapper mb={36}>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={e => {
              setForm({...form, email: e});
            }}
            autoFocus={true}
          />
          <FormField
            title="Nickname"
            value={form.nickname}
            handleChangeText={e => {
              setForm({...form, nickname: e});
            }}
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={e => {
              setForm({...form, password: e});
            }}
          />
          <FormField
            title="Confirm Password"
            value={form.checkPassword}
            handleChangeText={e => {
              setForm({...form, checkPassword: e});
            }}
          />
        </Wrapper>

        <Wrapper mb={36}>
          <CustomButton label="Sign Up" />
        </Wrapper>

        <Wrapper style={styles.loginContainer}>
          <CustomText fontWeight="medium" style={styles.loginText}>
            {t('recommendLogin', {language})}
          </CustomText>
          <TouchableOpacity>
            <CustomText
              fontWeight="bold"
              style={styles.loginLink}
              onPress={() =>
                navigation.navigate(authNavigations.SIGNIN as never)
              }>
              {t('loginHighlight', {language})}
            </CustomText>
          </TouchableOpacity>
        </Wrapper>
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      paddingVertical: 36,
    },
    title: {
      fontSize: 28,
      color: colors[theme].BLACK,
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 6,
    },
    loginText: {
      fontSize: 15,
      color: colors[theme].TEXT,
    },
    loginLink: {
      fontSize: 15,
      color: colors[theme].PRIMARY,
    },
  });

export default SignupScreen;
