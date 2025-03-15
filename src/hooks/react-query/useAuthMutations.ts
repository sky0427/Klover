import {
  deleteAccount,
  getMemberState,
  googleLogin,
  lineLogin,
  login,
  logout,
  refreshAccessToken,
  signup,
} from '@/api/authApi';
import {authNavigations} from '@/constants/navigations';
import useLanguageStore from '@/store/useLanguageStore';
import useAuthStore from '@/store/zustand/useAuthStore';
import {Country} from '@/types';
import {
  LoginRequest,
  LoginResponse,
  MemberDto,
  RefreshResponse,
  SignupRequest,
} from '@/types/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import LineLogin from '@xmartlabs/react-native-line';
import {useTranslation} from 'react-i18next';
import {Alert, ToastAndroid} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';

const lineClientId = Config.LINE_CLIENT_ID;

const useLoginMutation = () => {
  const {user, setUser} = useAuthStore();
  const {language} = useLanguageStore();
  const {t, i18n: i18nInstance} = useTranslation();
  const navigation = useNavigation();

  const mutation = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (credentials: {
      email: string;
      password: string;
    }): Promise<LoginResponse> => {
      return login(credentials);
    },
    onSuccess: async data => {
      // 로그인 성공 시 처리 (예: 토큰 저장, 리디렉션 등)
      setUser(data.memberDto);
      await EncryptedStorage.setItem('user', JSON.stringify(data.memberDto));
      await EncryptedStorage.setItem('refreshToken', data.refreshToken);
      await EncryptedStorage.setItem('accessToken', data.accessToken);

      Alert.alert(
        t('loginSuccessTitle', {language}),
        data.memberDto?.nickname + t('loginSuccessContent', {language}),
        [
          {
            text: t('AlertOK', {language}),
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{name: authNavigations.AUTH_HOME as never}],
              }),
          },
        ],
      );
    },
    onError: error => {
      // 로그인 실패 시 처리 (예: 에러 메시지 표시)
      console.error('Login failed:', error);
    },
  });

  return mutation;
};

const useGoogleLoginMutation = () => {
  const {user, setUser} = useAuthStore();
  const {language} = useLanguageStore();
  const {t, i18n: i18nInstance} = useTranslation();
  const navigation = useNavigation();

  const mutation = useMutation<LoginResponse, Error, void>({
    mutationFn: (): Promise<LoginResponse> => {
      return googleLogin();
    },
    onSuccess: async data => {
      // 로그인 성공 시 처리 (예: 토큰 저장, 리디렉션 등)
      setUser(data.memberDto);
      await EncryptedStorage.setItem('user', JSON.stringify(data.memberDto));
      await EncryptedStorage.setItem('refreshToken', data.refreshToken);
      await EncryptedStorage.setItem('accessToken', data.accessToken);

      Alert.alert(
        t('loginSuccessTitle', {language}),
        data.memberDto?.nickname + t('loginSuccessContent', {language}),
        [
          {
            text: t('AlertOK', {language}),
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{name: authNavigations.AUTH_HOME as never}],
              }),
          },
        ],
      );
    },
    onError: error => {
      // 로그인 실패 시 처리 (예: 에러 메시지 표시)
      console.error('Login failed:', error);
    },
  });
  return mutation;
};

const useLineLoginMutation = () => {
  const {user, setUser} = useAuthStore();
  const {language} = useLanguageStore();
  const {t, i18n: i18nInstance} = useTranslation();
  const navigation = useNavigation();

  const mutation = useMutation<LoginResponse, Error, void>({
    mutationFn: (): Promise<LoginResponse> => {
      return lineLogin();
    },
    onSuccess: async data => {
      // 로그인 성공 시 처리 (예: 토큰 저장, 리디렉션 등)
      setUser(data.memberDto);
      await EncryptedStorage.setItem('user', JSON.stringify(data.memberDto));
      await EncryptedStorage.setItem('refreshToken', data.refreshToken);
      await EncryptedStorage.setItem('accessToken', data.accessToken);

      Alert.alert(
        t('loginSuccessTitle', {language}),
        data.memberDto?.nickname + t('loginSuccessContent', {language}),
        [
          {
            text: t('AlertOK', {language}),
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{name: authNavigations.AUTH_HOME as never}],
              }),
          },
        ],
      );
    },
    onError: async error => {
      // 로그인 실패 시 처리 (예: 에러 메시지 표시)
      console.error('Login failed:', error);

      await EncryptedStorage.removeItem('providerAccessToken');
    },
  });
  return mutation;
};

const useSignupMutation = () => {
  const {language} = useLanguageStore();
  const {t, i18n: i18nInstance} = useTranslation();
  const navigation = useNavigation();
  const mutation = useMutation<void, Error, SignupRequest>({
    mutationFn: (signupParam: {
      email: string;
      password: string;
      checkPassword: string;
      nickname: string;
    }): Promise<void> => {
      return signup(signupParam);
    },
    onSuccess: () => {
      Alert.alert(
        t('signupSuccessTitle', {language}),
        t('signupSuccessContent', {language}),
        [
          {
            text: t('AlertOK', {language}),
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{name: authNavigations.SIGNIN as never}],
              }),
          },
        ],
      );
    },
    onError: error => {
      // 로그인 실패 시 처리 (예: 에러 메시지 표시)
      console.error('Login failed:', error);
    },
  });

  return mutation;
};

const useLogoutMutation = () => {
  const {user, clearUser} = useAuthStore();
  const mutation = useMutation<void, Error, void>({
    mutationFn: (): Promise<void> => {
      return logout();
    },
    onSuccess: () => {
      ToastAndroid.show('성공적인 로그아웃', ToastAndroid.SHORT);
    },
    onError: error => {
      ToastAndroid.show(`${error.message}가 발생`, ToastAndroid.SHORT);
    },
    onSettled: async () => {
      ToastAndroid.show('어쨌든 로그아웃 처리는 해야함', ToastAndroid.SHORT);

      await EncryptedStorage.removeItem('user');
      await EncryptedStorage.removeItem('accessToken');
      await EncryptedStorage.removeItem('refreshToken');

      if (user?.provider === 'google') {
        await GoogleSignin.signOut();
      }

      if (user?.provider === 'line') {
        await LineLogin.logout();
        await EncryptedStorage.removeItem('providerAccessToken');
      }
      clearUser();
    },
  });

  return mutation;
};

//상태 정보를 업데이트할 때 사용하는 Query. 호출하는 쪽에서 알아서 setUser를 사용
const useGetMemberStateMutation = () => {
  const {setUser} = useAuthStore();
  const {setLanguage} = useLanguageStore();
  const mutation = useMutation<MemberDto, Error, void>({
    mutationFn: (): Promise<MemberDto> => {
      return getMemberState();
    },
    onSuccess: async data => {
      setUser(data);

      switch (data.country) {
        case 'KO':
          setLanguage(Country.KO);
          break;
        case 'EN':
          setLanguage(Country.EN);
          break;
        case 'JA':
          setLanguage(Country.JA);
          break;
        case 'ZH':
          setLanguage(Country.ZH);
          break;
        default:
          break;
      }

      await EncryptedStorage.setItem('user', JSON.stringify(data));
      ToastAndroid.show('멤버 정보를 잘 얻어옴', ToastAndroid.SHORT);
    },
    onError: error => {
      ToastAndroid.show(
        `${error.message} 때문에 멤버 정보를 얻어오지 못했음`,
        ToastAndroid.SHORT,
      );
    },
  });

  return mutation;
};

const useRefreshAccessTokenMutation = () => {
  const mutation = useMutation<RefreshResponse, Error, void>({
    mutationFn: (): Promise<RefreshResponse> => {
      return refreshAccessToken();
    },
    onSuccess: async data => {
      await EncryptedStorage.setItem('accessToken', data.accessToken);
      ToastAndroid.show('액세스 토큰 재발급에 성공함', ToastAndroid.SHORT);
    },
    onError: error => {
      ToastAndroid.show(
        `${error.message} 때문에 액세스 토큰 발급에 실패함`,
        ToastAndroid.SHORT,
      );
    },
  });

  return mutation;
};

const useDeleteAccountMutation = () => {
  const {user, clearUser} = useAuthStore();
  const mutation = useMutation<void, Error, void>({
    mutationFn: (): Promise<void> => {
      return deleteAccount();
    },
    onSuccess: async () => {
      await EncryptedStorage.removeItem('user');
      await EncryptedStorage.removeItem('accessToken');
      await EncryptedStorage.removeItem('refreshToken');

      if (user?.provider === 'google') {
        await GoogleSignin.revokeAccess();
      } else if (user?.provider === 'line') {
        //라인 로그인 시에는 line이 준 AccessToken을 따로 보관함
        const providerAccessToken = await EncryptedStorage.getItem(
          'providerAccessToken',
        );

        const revokeUrl = 'https://api.line.me/oauth2/v2.1/revoke';
        const revokeParams = new URLSearchParams();

        revokeParams.append('client_id', lineClientId ?? 'error');
        revokeParams.append('access_token', providerAccessToken ?? 'error');

        await fetch(revokeUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: revokeParams.toString(),
        });

        await EncryptedStorage.removeItem('providerAccessToken');
      }

      clearUser();

      ToastAndroid.show('탈퇴해버림', ToastAndroid.SHORT);
    },
    onError: error => {
      ToastAndroid.show(
        `${error.message} 때문에 탈퇴에 실패함`,
        ToastAndroid.SHORT,
      );
    },
  });

  return mutation;
};

export {
  useDeleteAccountMutation,
  useGetMemberStateMutation,
  useGoogleLoginMutation,
  useLineLoginMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshAccessTokenMutation,
  useSignupMutation,
};
