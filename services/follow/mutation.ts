import {useMutation} from '@tanstack/react-query'
import {follow, unFollow} from './api'

export const useFollow = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return follow(id)
    },
  })
}

export const useUnFollow = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return unFollow(id)
    },
  })
}
