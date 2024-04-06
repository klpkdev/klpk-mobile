import {useMutation} from '@tanstack/react-query'
import {IPayloadWithdraw} from '../../interfaces/withdraws'
import {createWithdraws} from './api'

export const useCreateWithdraws = () => {
  return useMutation({
    mutationFn: (data: IPayloadWithdraw) => {
      return createWithdraws(data)
    },
  })
}
