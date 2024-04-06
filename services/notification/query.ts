import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {getNotification, getNotificationWithParams} from './api';

export const useGetNotification = () => {
  return useQuery({
    queryKey: ['get-notification'],
    queryFn: async () => getNotification(),
  });
};

export function useGetInfiniteNotification({
  params,
  enabled = true,
  pageParam = 1,
}: {
  params: {
    limit?: number;
  };
  enabled?: boolean;
  pageParam?: number;
}) {
  return useInfiniteQuery(
    ['infinite-notifications', pageParam, params],
    ({pageParam}) => {
      const newParam = {...params, page: pageParam};
      return getNotificationWithParams(newParam);
    },
    {
      enabled,
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.data?.length ? allPages.length + 1 : undefined;
      },
    },
  );
}
