import {queryKeys} from '@/constants/keys';
import {useInfiniteQuery} from '@tanstack/react-query';

import {getNotifications} from '@/api/notificationApi';
import {KloverPage, NotificationMessage} from '@/types';
export const useNotificationInfiniteQuery = (memberId: number) => {
  const queryResult = useInfiniteQuery<KloverPage<NotificationMessage>, Error>({
    queryKey: [queryKeys.GET_NOTIFICATION, memberId],
    queryFn: async ({
      pageParam = 0,
    }: any): Promise<KloverPage<NotificationMessage>> => {
      const response = await getNotifications(pageParam);
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.pageNumber + 1;
      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  return queryResult;
};
