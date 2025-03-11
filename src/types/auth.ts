import {ImageOrVideo} from 'react-native-image-crop-picker';
import {Country} from './enum';

export interface MemberDto {
  email: string;
  nickname: string;
  profileUrl: string;
  role: string;
  id: number;
  country: string;
  provider: string;
}

export interface LoginResponse {
  memberDto: MemberDto;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshResponse {
  accessToken: string;
}
export interface SignupRequest {
  email: string;
  password: string;
  checkPassword: string;
  nickname: string;
}

export interface MemberUpdateParam {
  nickname: string;
  country: Country;
  image: ImageOrVideo | undefined;
}
