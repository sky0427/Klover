import AuthInputField from '@/components/shared/AuthInputField';
import CustomIcon from '@/components/shared/CustomIcon';
import CustomText from '@/components/shared/CustomText';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import {colors} from '@/constants/colors';
import {authNavigations} from '@/constants/navigations';
import {
  useGoogleLoginMutation,
  useLineLoginMutation,
  useLoginMutation,
} from '@/hooks/react-query/useAuthMutations';
import useLanguageStore from '@/store/useLanguageStore';
import useThemeStore from '@/store/useThemeStore';
import {Country} from '@/types';
import {ThemeMode} from '@/types/type';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SigninScreen = () => {
  const {language, setLanguage} = useLanguageStore();
  const {t, i18n: i18nInstance} = useTranslation();
  const {theme} = useThemeStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {mutate: severLoginMutate} = useLoginMutation();
  const {mutate: googleLoginMutate} = useGoogleLoginMutation();
  const {mutate: lineLoginMutate} = useLineLoginMutation();

  const styles = styling(theme);
  const navigation = useNavigation();

  useEffect(() => {
    // zustand 의 language 가 변경될때, i18next 의 language 도 함께 변경.
    i18nInstance.changeLanguage(language);
  }, [language, i18nInstance]);

  return (
    <ScreenWrapper>
      <KeyboardAwareScrollView style={styles.container}>
        {/* Header */}
        <CustomText
          fontWeight="regular"
          style={language !== Country.EN ? styles.title : styles.titleEN}>
          {t('loginTitle', {language})}
        </CustomText>
        <CustomText
          fontWeight="regular"
          style={language !== Country.EN ? styles.subtitle : styles.subtitleEN}>
          {t('loginCaption', {language})}
        </CustomText>

        {/* Email Input */}
        <CustomText fontWeight="regular" style={styles.label}>
          {t('loginEmailCaption', {language})}
        </CustomText>

        <AuthInputField
          icon="MailLineSvg"
          placeholder={t('loginEmailCaption', {language})}
          placeholderTextColor="#808080"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Password Input */}
        <CustomText fontWeight="regular" style={styles.label}>
          {t('loginPasswordCaption', {language})}
        </CustomText>
        <AuthInputField
          icon="LockLineSvg"
          placeholder={t('loginPasswordCaption', {language})}
          secureTextEntry={true}
          placeholderTextColor="#808080"
          value={password}
          onChangeText={setPassword}
        />

        {/* Get Started Button */}
        <TouchableOpacity
          style={language !== Country.EN ? styles.button : styles.buttonEN}
          onPress={() => severLoginMutate({email, password})}>
          <CustomText fontWeight="regular" style={styles.buttonText}>
            {t('loginButton', {language})}
          </CustomText>
        </TouchableOpacity>

        {/* Or Separator */}
        <Text style={language !== Country.EN ? styles.or : styles.orEN}>
          OR
        </Text>

        {/* Continue with Google */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => googleLoginMutate()}>
          <CustomIcon name="GoogleSvg" style={styles.socialIcon} />
          <CustomText fontWeight="regular" style={styles.socialButtonText}>
            {t('GoogleLogin', {language})}
          </CustomText>
        </TouchableOpacity>

        {/* Continue with Line */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => lineLoginMutate()}>
          <CustomIcon name="LineSvg" style={styles.socialIcon} />
          <CustomText fontWeight="regular" style={styles.socialButtonText}>
            {t('LineLogin', {language})}
          </CustomText>
        </TouchableOpacity>

        {/* Sign Up Menu */}
        <View
          style={
            language !== Country.EN
              ? styles.signupContainer
              : styles.signupContainerEN
          }>
          <CustomText fontWeight="regular" style={styles.signupText}>
            {t('recommendSignup', {language})}
          </CustomText>
          <TouchableOpacity>
            <CustomText
              fontWeight="regular"
              style={styles.signupLink}
              onPress={() =>
                navigation.navigate(authNavigations.SIGNUP as never)
              }>
              {t('signupHighlight', {language})}
            </CustomText>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].BACKGROUND, //  Background color
      padding: 20,
      paddingTop: 50, // Adjust top padding as needed
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors[theme].GRAY_500,
      marginBottom: 5,
      textAlign: 'left',
    },
    titleEN: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors[theme].GRAY_500,
      marginBottom: 10,
      marginTop: 30,
      textAlign: 'left',
    },
    subtitle: {
      fontSize: 16,
      color: colors[theme].GRAY_500,
      marginBottom: 5,
      textAlign: 'left',
    },
    subtitleEN: {
      fontSize: 16,
      color: colors[theme].GRAY_500,
      marginBottom: 20,
      textAlign: 'left',
    },
    label: {
      fontSize: 14,
      color: colors[theme].GRAY_500,
      marginBottom: 1,
      textAlign: 'left',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors[theme].BACKGROUND,
      borderRadius: 10,
      marginBottom: 20,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    icon: {
      width: 20,
      height: 20,
      marginRight: 10,
    },
    input: {
      flex: 1,
      height: 40,
      fontSize: 16,
    },
    button: {
      backgroundColor: colors[theme].PURPLE_500, // button color
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 20,
    },
    buttonEN: {
      backgroundColor: colors[theme].PURPLE_500, // button color
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 30,
    },
    buttonText: {
      color: colors[theme].WHITE,
      fontSize: 18,
      fontWeight: 'bold',
    },
    or: {
      fontSize: 16,
      color: colors[theme].GRAY_500,
      textAlign: 'center',
      marginBottom: 20,
    },
    orEN: {
      fontSize: 16,
      color: colors[theme].GRAY_500,
      textAlign: 'center',
      marginBottom: 30,
    },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors[theme].WHITE,
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 20,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    socialIcon: {
      width: 20,
      height: 20,
      marginRight: 10,
    },
    socialButtonText: {
      fontSize: 16,
      color: colors[theme].BLACK,
    },
    signupContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
      alignItems: 'center',
    },
    signupContainerEN: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    signupText: {
      fontSize: 14,
      color: colors[theme].BLACK,
    },
    signupLink: {
      fontSize: 14,
      color: colors[theme].PURPLE_500, // Signup link color
      fontWeight: 'bold',
    },
  });

export default SigninScreen;
