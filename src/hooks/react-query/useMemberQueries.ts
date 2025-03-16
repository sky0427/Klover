import {getMemberInfo, MemberInfo} from '@/api/memberApi';
import {useQuery} from '@tanstack/react-query';

const useGetMemberInfo = (memberId: number) => {
  const queryResult = useQuery<MemberInfo, Error>({
    queryKey: ['memberInfo', memberId],
    queryFn: async () => {
      const result = await getMemberInfo(memberId);
      return result;
    },
    enabled: !!memberId,
    retry: 1,
  });
  return queryResult;
};

export default useGetMemberInfo;
