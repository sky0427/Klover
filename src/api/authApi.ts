import {LoginResponse, MemberDto, RefreshResponse} from '@/types/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import LineLogin, {
  BotPrompt,
  LoginPermission,
} from '@xmartlabs/react-native-line';
import EncryptedStorage from 'react-native-encrypted-storage';
import {DELETE, GET, POST} from './commonApi';

export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const response = await POST<LoginResponse>('/api/v1/auth/login', {
    email: credentials.email,
    password: credentials.password,
  });
  const body = response.data;

  if (body.returnCode !== '0000') {
    throw new Error(body.returnMessage);
  }

  const data = body.data;
  if (data === undefined) {
    throw new Error(body.returnMessage);
  }

  return data;
};

export const googleLogin = async (): Promise<LoginResponse> => {
  const result = await GoogleSignin.signIn();

  if (result.type === 'cancelled') {
    throw Error('구글 로그인 실패');
  }

  const idToken = result.data?.idToken;

  const response = await POST<LoginResponse>('/api/v1/auth/google', {idToken});

  const body = response.data;

  if (body.returnCode !== '0000') {
    throw new Error(body.returnMessage);
  }

  const data = body.data;
  if (data === undefined) {
    throw new Error(body.returnMessage);
  }

  return data;
};

export const lineLogin = async (): Promise<LoginResponse> => {
  const result = await LineLogin.login({
    scopes: [
      LoginPermission.Email,
      LoginPermission.OpenId,
      LoginPermission.Profile,
    ],
    botPrompt: BotPrompt.Normal,
    onlyWebLogin: true,
  });

  if (!result) {
    throw new Error('라인 로그인 실패');
  }

  const idToken = result.accessToken?.idToken;
  EncryptedStorage.setItem(
    'providerAccessToken',
    result.accessToken?.accessToken,
  );

  const response = await POST<LoginResponse>('/api/v1/auth/line', {idToken});
  console.log(response);
  const body = response.data;
  if (body.returnCode !== '0000') {
    throw new Error(body.returnMessage);
  }
  const data = body.data;

  if (data === undefined) {
    throw new Error(body.returnMessage);
  }

  return data;
};

export const logout = async (): Promise<void> => {
  const refreshToken = await EncryptedStorage.getItem('refreshToken');
  const accessToken = await EncryptedStorage.getItem('accessToken');
  const response = await POST(
    '/api/v1/auth/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Refresh-Token': refreshToken,
      },
    },
  );

  const body = response.data;
  if (body.returnCode !== '0000') {
    throw new Error(body.returnMessage);
  }
};

export const signup = async (signupParam: {
  email: string;
  password: string;
  checkPassword: string;
  nickname: string;
}): Promise<void> => {
  const regex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const emailValid = regex.test(signupParam.email);

  if (!emailValid) {
    throw new Error('Invalid Email Format');
  }

  if (signupParam.password !== signupParam.checkPassword) {
    throw new Error('password check is failed. please check your password.');
  }

  const response = await POST('/api/v1/auth/signup', {
    email: signupParam.email,
    password: signupParam.password,
    nickname: signupParam.nickname,
  });

  const body = response.data;
  if (body.returnCode !== '0000') {
    throw new Error(body.returnMessage);
  }
};

export const refreshAccessToken = async (): Promise<RefreshResponse> => {
  const refreshToken = await EncryptedStorage.getItem('refreshToken');

  const response = await POST<RefreshResponse>(
    '/api/v1/auth/refresh',
    {},
    {
      headers: {
        'X-Refresh-Token': refreshToken,
      },
    },
  );

  const body = response.data;
  if (body.returnCode !== '0000') {
    throw new Error(body.returnMessage);
  }

  const data = body.data;
  if (data === undefined) {
    throw new Error(body.returnMessage);
  }

  return data;
};

export const deleteAccount = async (): Promise<void> => {
  const accessToken = await EncryptedStorage.getItem('accessToken');

  const response = await DELETE(
    '/api/v1/members',
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const body = response.data;
  if (body.returnCode !== '0000') {
    throw new Error(body.returnMessage);
  }
};

export const getMemberState = async (): Promise<MemberDto> => {
  const accessToken = await EncryptedStorage.getItem('accessToken');

  const response = await GET<MemberDto>('/api/v1/auth/authinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const body = response.data;
  if (body.returnCode !== '0000') {
    throw Error(body.returnMessage);
  }

  const data = body.data;
  if (data === undefined) {
    throw new Error(body.returnCode);
  }

  return data;
};

// 다른 인증 관련 API 함수 추가 (refreshToken, verifyEmail 등)
