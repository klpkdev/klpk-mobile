import {
  IParams,
  IParamsBook,
  IPayload,
  IPayloadChapter,
  IPayloadCover,
} from '../../interfaces/mybooks';
import {httpRequest} from '../../libs/httpRequest';

const fetch = httpRequest();

export const getPublicBooks = (params: IParamsBook) => {
  return fetch.get('/public-books', {params});
};

export const getDetailPublicBooks = (bookId: string) => {
  return fetch.get(`/public-books/${bookId}`);
};

export const getChapterPublicBooks = (bookId: string, chapterId: string) => {
  return fetch.get(`/public-books/${bookId}/chapters/${chapterId}`);
};

export const getBooks = (params: IParamsBook) => {
  return fetch.get('/books', {params});
};

export const myBooks = (params: IParams) => {
  return fetch.get('/books/@me', {params});
};

export const myBooksInfity = (params: IParams) => {
  return fetch.get('/books/@me', {params});
};

export const MyBookCreate = (data: IPayload) => {
  return fetch.post('/books', data);
};

export const myBookDetail = (bookId: string) => {
  return fetch.get(`/books/${bookId}`);
};

export const MyBookUpdate = (data: IPayload) => {
  return fetch.put(`/books/${data.bookId}`, data);
};

export const MyBookCover = (data: IPayloadCover) => {
  return fetch.post(`/books/${data.bookId}/covers`, data.file, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'cache-control': ' no-cache',
    },
  });
};

export const myBookPublish = (bookId: string) => {
  return fetch.put(`/books/${bookId}/publish`);
};

export const myBookComplete = (bookId: string) => {
  return fetch.put(`/books/${bookId}/complete`);
};

export const myBookChapterCreate = (data: IPayloadChapter) => {
  return fetch.post(`/books/${data.bookId}/chapters/`, data);
};

export const myBookChapterDetail = (bookId: string, chapterId: string) => {
  return fetch.get(`/books/${bookId}/chapters/${chapterId}`);
};

export const myBookChapterUpdate = (data: IPayloadChapter) => {
  return fetch.put(`/books/${data.bookId}/chapters/${data.chapterId}`, data);
};

export const myBooksInfinite = async (pageParam: number) => {
  const res = await fetch.get(`/books/@me?page=${pageParam}&limit=9`);
  return res.data;
};

export const bookSubscription = (data: {id: string}) => {
  return fetch.post(`/books/${data.id}/subscription`);
};

export const bookRating = (data: {bookId: string; body: {value: number}}) => {
  return fetch.post(`/books/${data.bookId}/ratings`, data.body);
};

export const getDetailPublicBooksRating = (bookId: string) => {
  return fetch.get(`/books/${bookId}/ratings`);
};
