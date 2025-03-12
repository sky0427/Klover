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
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SigninScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation();
  const {language} = useLanguageStore();
  const {t, i18n: i18nInstance} = useTranslation();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  const {mutate: localLoginMutate} = useLoginMutation();
  const {mutate: googleLoginMutate} = useGoogleLoginMutation();
  const {mutate: lineLoginMutate} = useLineLoginMutation();

  const submit = async () => {
    if (form.email === '' || form.password === '') {
    }
  };

  return (
    <ScreenWrapper style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>
        <Wrapper mb={36}>
          <CustomText fontWeight="bold" style={styles.title}>
            {t('loginTitle', {language})}
          </CustomText>
          <CustomText fontWeight="medium" style={styles.subtitle}>
            {t('loginCaption', {language})}
          </CustomText>
        </Wrapper>

        <Wrapper mb={36}>
          <FormField
            title={t('loginEmailCaption', {language})}
            value={form.email}
            handleChangeText={e => {
              setForm({...form, email: e});
            }}
          />

          <FormField
            title={t('loginPasswordCaption', {language})}
            value={form.password}
            placeholder=""
            handleChangeText={e => {
              setForm({...form, password: e});
            }}
          />
        </Wrapper>

        <Wrapper>
          <CustomButton
            label={t('loginButton', {language})}
            onPress={() => localLoginMutate(form)}
          />
        </Wrapper>

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
            {t('recommendSignup', {language})}
          </CustomText>
          <TouchableOpacity>
            <CustomText
              fontWeight="bold"
              style={styles.signupLink}
              onPress={() =>
                navigation.navigate(authNavigations.SIGNUP as never)
              }>
              {t('signupHighlight', {language})}
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
      fontSize: 18,
      color: colors[theme].TEXT,
      width: '85%',
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
      height: 1,
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
