export interface IPayload {
  title: string
  categoryId: string
  synopsis: string
  bookId?: string
}

export interface IPayloadChapter {
  name: string
  content: string
  bookId: string
  chapterId?: string
}

export interface IPayloadCover {
  bookId: string
  file: FormData
}

export interface IParams {
  status?: string | undefined
  limit?: number
  page?: number
}

export interface IParamsBook {
  category?: string
  userId?: string
  search?: string
  completed?: boolean
  limit?: number
  page?: number
}
