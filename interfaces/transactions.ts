export interface IItemTopup {
  id: string
  amount: string
  price: string
  detail?: {
    total?: number
    coin?: number
  }
}

export interface ITransaction {
  items: IItemTopup[]
  selected: IItemTopup | undefined
  onPress: (item: IItemTopup) => void
}

export interface ITransactionParams {
  types?: string[]
  limit?: number
  page?: number
}

export interface ITransactionModel {
  id: string
  type: 'topup' | 'bookPurchase' | 'chapterPurchase' | 'bookSales' | 'chapterSales' | 'withdraw' | 'withdrawRejection'
  amount: number
  metadata: string
  transactionDate: string
}
