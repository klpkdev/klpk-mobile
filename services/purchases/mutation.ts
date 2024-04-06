import {useMutation} from '@tanstack/react-query'
import {IPurchasesPayload} from '../../interfaces/purchases'
import {purchases} from './api'

export const usePurchases = () => {
  return useMutation({
    mutationFn: (data: IPurchasesPayload) => {
      return purchases(data)
    },
  })
}
