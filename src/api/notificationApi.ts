import {KloverPage, NotificationMessage} from '@/types';
import {MemberDto} from '@/types/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import {GET} from './commonApi';

export const getNotifications = async (
  page: number,
): Promise<KloverPage<NotificationMessage>> => {
  const userStr = await EncryptedStorage.getItem('user');
  if (!userStr) {
    throw new Error('please Login');
  }

  const user: MemberDto = JSON.parse(userStr);

  const response = await GET<string>(`/api/v1/notification/${user.id}`, {
    params: {page: page, limit: 10},
  });

  if (response.data.returnCode !== '0000') {
    throw new Error(response.data.returnMessage);
  }

  return {
    pageNumber: response.data.kloverPage?.pageNumber,
    pageSize: response.data.kloverPage?.pageSize,
    totalPages: response.data.kloverPage?.totalPages,
    totalCount: response.data.kloverPage?.totalCount,
    contents:
      response.data.kloverPage?.contents.map(
        obj => JSON.parse(obj) as NotificationMessage,
      ) ?? [],
  } as KloverPage<NotificationMessage>;
};
