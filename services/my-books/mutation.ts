import {useMutation} from '@tanstack/react-query'
import {IPayload, IPayloadChapter, IPayloadCover} from '../../interfaces/mybooks'
import {
  bookRating,
  bookSubscription,
  myBookChapterCreate,
  myBookChapterUpdate,
  myBookComplete,
  MyBookCover,
  MyBookCreate,
  myBookPublish,
  MyBookUpdate,
} from './api'

export const useMyBookCreate = () => {
  return useMutation({
    mutationFn: (data: IPayload) => {
      return MyBookCreate(data)
    },
  })
}

export const useMyBookUpdate = () => {
  return useMutation({
    mutationFn: (data: IPayload) => {
      return MyBookUpdate(data)
    },
  })
}

export const useMyBookCover = () => {
  return useMutation({
    mutationFn: (data: IPayloadCover) => {
      return MyBookCover(data)
    },
  })
}

export const useMyBookPublish = () => {
  return useMutation({
    mutationFn: (bookId: string) => {
      return myBookPublish(bookId)
    },
  })
}

export const useMyBookComplete = () => {
  return useMutation({
    mutationFn: (bookId: string) => {
      return myBookComplete(bookId)
    },
  })
}

export const useMyBookChapterCreate = () => {
  return useMutation({
    mutationFn: (data: IPayloadChapter) => {
      return myBookChapterCreate(data)
    },
  })
}

export const useMyBookChapterUpdate = () => {
  return useMutation({
    mutationFn: (data: IPayloadChapter) => {
      return myBookChapterUpdate(data)
    },
  })
}

export const useBookSubscription = () => {
  return useMutation({
    mutationFn: (data: {id: string}) => {
      return bookSubscription(data)
    },
  })
}

export const useBookRating = () => {
  return useMutation({
    mutationFn: (data: {bookId: string; body: {value: number, review?: string}}) => {
      return bookRating(data)
    },
  })
}
