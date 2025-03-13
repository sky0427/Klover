import FormField from '@/components/auth/FormField';
import CustomButton from '@/components/shared/CustomButton';
import CustomIcon from '@/components/shared/CustomIcon';
import CustomText from '@/components/shared/CustomText';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import Wrapper from '@/components/shared/Wrapper';
import {colors} from '@/constants/colors';
import {authNavigations} from '@/constants/navigations';
import {
  useGoogleLoginMutation,
  useLineLoginMutation,
  useLoginMutation,
} from '@/hooks/react-query/useAuthMutations';
import useLanguageStore from '@/store/useLanguageStore';
import useThemeStore from '@/store/useThemeStore';
import {LoginRequest} from '@/types/auth';
import {ThemeMode} from '@/types/type';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';

const SigninScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation();
  const {language} = useLanguageStore();
  const {t} = useTranslation();
  const [isSubmitting, setSubmitting] = useState(false);

  const {mutate: localLoginMutate} = useLoginMutation();
  const {mutate: googleLoginMutate} = useGoogleLoginMutation();
  const {mutate: lineLoginMutate} = useLineLoginMutation();

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('invalid_email', {language}))
      .required(t('required_email', {language})),
    password: yup
      .string()
      .min(6, t('invalid_password', {language}))
      .required(t('required_password', {language})),
  });

  const initialValues: LoginRequest = {
    email: '',
    password: '',
  };

  const handleLogin = (values: LoginRequest) => {
    setSubmitting(true);
    localLoginMutate(values, {
      onSettled: () => {
        setSubmitting(false);
      },
      onError: error =>
        Toast.show({
          type: 'error',
          text1: error.message,
          position: 'top',
          visibilityTime: 2000,
        }),
    });
  };

  return (
    <ScreenWrapper style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <Wrapper mb={36}>
          <CustomText fontWeight="bold" style={styles.title}>
            {t('login_title', {language})}
          </CustomText>
          <CustomText fontWeight="medium" style={styles.subtitle}>
            {t('login_subtitle', {language})}
          </CustomText>
        </Wrapper>

        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <View>
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
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                />
              </Wrapper>

              <Wrapper>
                <CustomButton
                  label={t('login', {language})}
                  onPress={handleSubmit}
                  isLoading={isSubmitting}
                  disabled={!isValid || isSubmitting}
                />
              </Wrapper>
            </View>
          )}
        </Formik>

        <Wrapper mv={36} style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.or}>OR</Text>
          <View style={styles.dividerLine} />
        </Wrapper>

        <Wrapper mb={36} style={styles.socialButtonContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => googleLoginMutate()}>
            <CustomIcon
              name="GoogleSvg"
              size={32}
              color={colors[theme].BLACK}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => lineLoginMutate()}>
            <CustomIcon name="LineSvg" size={32} color={colors[theme].BLACK} />
          </TouchableOpacity>
        </Wrapper>

        <Wrapper style={styles.signupContainer}>
          <CustomText fontWeight="medium" style={styles.signupText}>
            {t('signup_recommend', {language})}
          </CustomText>
          <TouchableOpacity>
            <CustomText
              fontWeight="bold"
              style={styles.signupLink}
              onPress={() =>
                navigation.navigate(authNavigations.SIGNUP as never)
              }>
              {t('signup', {language})}
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
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingVertical: 36,
    },
    title: {
      fontSize: 28,
      color: colors[theme].BLACK,
      marginBottom: 12,
    },
    subtitle: {
      fontSize: 16,
      color: colors[theme].TEXT,
      width: '80%',
    },
    or: {
      fontSize: 16,
      color: colors[theme].TEXT,
    },
    divider: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 50,
      gap: 12,
    },
    dividerLine: {
      flex: 1,
      height: 2,
      marginHorizontal: 6,
      backgroundColor: colors[theme].BORDER,
    },
    socialButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
    },
    socialButton: {
      width: 64,
      height: 64,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: colors[theme].BORDER,
      borderRadius: 16,
      // backgroundColor: colors[theme].INPUT,
    },
    signupContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 6,
    },
    signupText: {
      fontSize: 15,
      color: colors[theme].TEXT,
    },
    signupLink: {
      fontSize: 15,
      color: colors[theme].PRIMARY,
    },
  });

export default SigninScreen;
