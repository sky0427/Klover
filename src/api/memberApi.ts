import {Country} from '@/types';
import EncryptedStorage from 'react-native-encrypted-storage';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {PATCH} from './commonApi';

const MAX_FILE_SIZE = 1; //1MB
const MB = 1024 * 1024;
const PROFILE_IMAGE_VOLUME = 320;

export const uploadProfileImage = async (
  setImage: (image: ImageOrVideo | null) => void,
) => {
  try {
    const image = await ImagePicker.openPicker({
      width: PROFILE_IMAGE_VOLUME,
      height: PROFILE_IMAGE_VOLUME,
      cropping: true, // 크롭 기능 활성화
    });

    if (image.size / MB > MAX_FILE_SIZE) {
      return;
    }

    setImage(image);
  } catch (error) {
    console.log('Image selection error:', error);
  }
};

export const updateMember = async (updateParam: {
  nickname: string;
  country: Country;
  image: ImageOrVideo | undefined;
}) => {
  const formData = new FormData();

  // 닉네임, 국적 추가
  formData.append(
    'request',
    JSON.stringify({
      nickname: updateParam.nickname,
      country: updateParam.country,
    }),
  );
  // 이미지 파일 추가
  if (updateParam.image) {
    formData.append('imageFile', {
      uri: updateParam.image.path,
      name: updateParam.image.filename,
      type: updateParam.image.mime,
    });
  }

  const accessToken = await EncryptedStorage.getItem('accessToken');
  // 데이터 전송

  const response = await PATCH('/api/v1/members', formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  const body = response.data;
  if (body.returnCode !== '0000') {
    throw new Error(body.returnMessage);
  }
};
