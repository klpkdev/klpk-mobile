import {useMutation} from '@tanstack/react-query'
import {IMePayload, IMePayloadAvatar, IMePayloadCover} from '../../interfaces/currentUser'
import {UpdateMe, UpdateMyAvatar, UpdateMyCover, deleteUser} from './api'

export const useUpdateMe = () => {
  return useMutation({
    mutationFn: (data: IMePayload) => {
      return UpdateMe(data)
    },
  })
}

export const useUpdateMyAvatar = () => {
  return useMutation({
    mutationFn: (data: IMePayloadAvatar) => {
      return UpdateMyAvatar(data)
    },
  })
}

export const useUpdateMyCover = () => {
  return useMutation({
    mutationFn: (data: IMePayloadCover) => {
      return UpdateMyCover(data)
    },
  })
}

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: (data: any) => {
      return deleteUser()
    },
  })
}

