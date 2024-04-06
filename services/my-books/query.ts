import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {IParams, IParamsBook} from '../../interfaces/mybooks';
import {
  getBooks,
  getChapterPublicBooks,
  getDetailPublicBooks,
  getDetailPublicBooksRating,
  getPublicBooks,
  myBookChapterDetail,
  myBookDetail,
  myBooks,
  myBooksInfity,
} from './api';

export const useMyBooks = (params: IParams) => {
  return useQuery({
    queryKey: ['my-books', params],
    queryFn: async () => myBooks(params),
  });
};

export function useGetInfiniteMyBook({
  params,
  enabled = true,
  pageParam = 1,
}: {
  params: {status?: string; limit?: number};
  enabled?: boolean;
  pageParam?: number;
}) {
  return useInfiniteQuery(
    ['infinite-my-books', pageParam, params],
    ({pageParam}) => {
      const newParam = {...params, page: pageParam};
      return myBooksInfity(newParam);
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

export const useMyBookDetail = (bookId: string | undefined) => {
  return useQuery({
    queryKey: ['my-books', bookId],
    queryFn: async () => myBookDetail(bookId as string),
    enabled: bookId !== undefined,
  });
};

export const useMyBookChapterDetail = (
  bookId: string | undefined,
  chapterId: string | undefined,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: ['my-books-chapter-detail', bookId, chapterId],
    queryFn: async () =>
      myBookChapterDetail(bookId as string, chapterId as string),
    enabled,
  });
};

export const useBooks = (params: IParamsBook) => {
  return useQuery({
    queryKey: ['get-books', params],
    queryFn: async () => getBooks(params),
  });
};

export const usePublicBooks = (params: IParamsBook) => {
  return useQuery({
    queryKey: ['get-public-books', params],
    queryFn: async () => getPublicBooks(params),
  });
};

export const usePublicBooksRating = (bookId: string) => {
  return useQuery({
    queryKey: ['get-public-books-rating', bookId],
    queryFn: async () => getDetailPublicBooksRating(bookId),
  });
};

export const usePublicBookDetail = (bookId: string | undefined) => {
  return useQuery({
    queryKey: ['get-public-books-detail', bookId],
    queryFn: async () => getDetailPublicBooks(bookId as string),
    enabled: bookId !== undefined,
  });
};

export const usePublicBookChapterDetail = (
  bookId: string | undefined,
  chapterId: string | undefined,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: ['get-public-books-chapter-detail', bookId, chapterId],
    queryFn: async () =>
      getChapterPublicBooks(bookId as string, chapterId as string),
    enabled,
  });
};

export function useGetInfinitePublicBook({
  params,
  enabled = true,
  pageParam = 1,
}: {
  params: {
    status?: string;
    limit?: number;
    completed?: boolean;
    category?: string;
    search?: string;
    userId?: string;
  };
  enabled?: boolean;
  pageParam?: number;
}) {
  return useInfiniteQuery(
    ['infinite-public-books', pageParam, params],
    ({pageParam}) => {
      const newParam = {...params, page: pageParam};
      return getPublicBooks(newParam);
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
