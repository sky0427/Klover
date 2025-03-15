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
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useSignupMutation} from '@/hooks/react-query/useAuthMutations';

const SignupScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation();
  const {language} = useLanguageStore();
  const {t} = useTranslation();
  const {mutate: signupMutate} = useSignupMutation();
  const [isSubmitting, setSubmitting] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const nicknameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const checkPasswordRef = useRef<TextInput>(null);

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('invalid_email', {language}))
      .required(t('required_email', {language})),
    nickname: yup
      .string()
      .min(3, t('invalid_nickname_length', {language}))
      .max(8, t('invalid_nickname_length', {language}))
      .required(t('required_nickname', {language})),
    password: yup
      .string()
      .min(8, t('invalid_password_length', {language}))
      .max(16, t('invalid_password_length', {language}))
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,16}$/,
        t('invalid_password', {language}),
      )
      .required(t('required_password', {language})),
    checkPassword: yup
      .string()
      .equals(
        [yup.ref('password'), null],
        t('invalid_checkpassword', {language}),
      )
      .required(t('required_checkpassword', {language})),
  });

  const initialValues: SignupRequest = {
    email: '',
    nickname: '',
    password: '',
    checkPassword: '',
  };

  const handleSignup = (values: SignupRequest) => {
    setSubmitting(true);
    signupMutate(values, {
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <ScreenWrapper style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <Wrapper mb={36}>
          <CustomText fontWeight="bold" style={styles.title}>
            {t('signup_title', {language})}
          </CustomText>
        </Wrapper>

        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSignup}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <>
              <Wrapper mb={36}>
                <FormField
                  ref={emailRef}
                  type="email"
                  autoFocus
                  label={t('email', {language})}
                  value={values.email}
                  handleChangeText={handleChange('email')}
                  handleBlur={() => handleBlur('email')}
                  error={touched.email && errors.email}
                  returnKeyType="next"
                  onSubmitEditing={() => nicknameRef.current?.focus()}
                />

                <FormField
                  ref={nicknameRef}
                  type="default"
                  label={t('nickname', {language})}
                  value={values.nickname}
                  handleChangeText={handleChange('nickname')}
                  handleBlur={() => handleBlur('nickname')}
                  error={touched.nickname && errors.nickname}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />

                <FormField
                  ref={passwordRef}
                  type="password"
                  label={t('password', {language})}
                  value={values.password}
                  placeholder=""
                  handleChangeText={handleChange('password')}
                  handleBlur={() => handleBlur('password')}
                  error={touched.password && errors.password}
                  returnKeyType="next"
                  onSubmitEditing={() => checkPasswordRef.current?.focus()}
                />

                <FormField
                  ref={checkPasswordRef}
                  type="password"
                  label={t('check_password', {language})}
                  value={values.checkPassword}
                  placeholder=""
                  handleChangeText={handleChange('checkPassword')}
                  handleBlur={() => handleBlur('checkPassword')}
                  error={touched.checkPassword && errors.checkPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                />
              </Wrapper>

              <Wrapper mb={36}>
                <CustomButton
                  label={t('signup', {language})}
                  onPress={handleSubmit}
                  isLoading={isSubmitting}
                  disabled={!isValid || isSubmitting}
                />
              </Wrapper>
            </>
          )}
        </Formik>

        <Wrapper style={styles.loginContainer}>
          <CustomText fontWeight="medium" style={styles.loginText}>
            {t('login_recommend', {language})}
          </CustomText>
          <TouchableOpacity>
            <CustomText
              fontWeight="bold"
              style={styles.loginLink}
              onPress={() =>
                navigation.navigate(authNavigations.SIGNIN as never)
              }>
              {t('login', {language})}
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
