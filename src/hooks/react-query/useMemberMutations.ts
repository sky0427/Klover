import {updateMember} from '@/api/memberApi';
import {Country} from '@/types';
import {MemberUpdateParam} from '@/types/auth';
import {useMutation} from '@tanstack/react-query';
import {ToastAndroid} from 'react-native';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {useGetMemberStateMutation} from './useAuthMutations';

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
      ToastAndroid.show('언어 변경에 성공함', ToastAndroid.SHORT);
      mutate();
    },
    onError: error => {
      ToastAndroid.show(
        `${error.message} 때문에 언어 변경에 실패함`,
        ToastAndroid.SHORT,
      );
    },
  });

  return mutation;
};

export default useMemberUpdateMutation;
