import {updateMember} from '@/api/memberApi';
import {Country} from '@/types';
import {MemberUpdateParam} from '@/types/auth';
import {useMutation} from '@tanstack/react-query';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {useGetMemberStateMutation} from './useAuthMutations';
import Toast from 'react-native-toast-message';

const useMemberUpdateMutation = () => {
  const {mutate} = useGetMemberStateMutation();
  const mutation = useMutation<void, Error, MemberUpdateParam>({
    mutationFn: (updateParam: {
      nickname: string;
      country: Country;
      image: ImageOrVideo | undefined;
    }): Promise<void> => {
      return updateMember(updateParam);
    },
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: '언어 변경에 성공하였습니다.',
      });
      mutate();
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: `${error.message} 때문에 언어 변경에 실패하였습니다.`,
      });
    },
  });

  return mutation;
};

export default useMemberUpdateMutation;
