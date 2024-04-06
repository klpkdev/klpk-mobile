import {useInfiniteQuery, useQuery} from '@tanstack/react-query'
import {ITransactionParams} from '../../interfaces/transactions'
import {getTransactions} from './api'

export const useGetTransactions = (params: ITransactionParams) => {
  return useQuery({queryKey: ['get-transactions'], queryFn: async () => getTransactions(params)})
}

export function useGetInfiniteTransactions({
  params,
  enabled = true,
  pageParam = 1,
}: {
  params: {
    types?: string[]
    limit?: number
    page?: number
  };
  enabled?: boolean;
  pageParam?: number;
}) {
  return useInfiniteQuery(
    ['infinite-get-transactions', pageParam, params],
    ({pageParam}) => {
      const newParam = {...params, page: pageParam};
      return getTransactions(newParam);
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
