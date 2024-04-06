import {useQuery} from '@tanstack/react-query'
import {getFollowers, getFollowing, getProfileById} from './api'

export const useGetProfileById = (id: string) => {
  return useQuery({
    queryKey: ['get-profile-by-id', id],
    queryFn: async () => getProfileById(id),
    enabled: id !== undefined,
  })
}

export const useGetFollowers = (id: string, enabled?: false) => {
  return useQuery({
    queryKey: ['get-followers', id],
    queryFn: async () => getFollowers(id),
    enabled: id !== '',
  })
}

export const useGetFollowing = (id: string, enabled?: false) => {
  return useQuery({
    queryKey: ['get-followers', id],
    queryFn: async () => getFollowing(id),
    enabled: id !== '',
  })
}
