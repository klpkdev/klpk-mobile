import {useMutation} from '@tanstack/react-query'
import {IVerificationPayload} from '../../interfaces/verification'
import {createVerification, updateVerification} from './api'

export const useCreateVerification = () => {
  return useMutation({
    mutationFn: (data: IVerificationPayload) => {
      return createVerification(data)
    },
  })
}
export const useUpdateVerification = () => {
  return useMutation({
    mutationFn: (data: IVerificationPayload) => {
      return updateVerification(data)
    },
  })
}
