import {useQuery} from '@tanstack/react-query'
import {IParamsFeed, IParamsTopWriter} from '../../interfaces/feed'
import {getBestSeller, getTopWriters} from './api'

export const useGetBestSeller = (params: IParamsFeed) => {
  return useQuery({
    queryKey: ['get-best-seller', params],
    queryFn: async () => getBestSeller(params),
  })
}

export const useGetTopWriters = (params: IParamsTopWriter) => {
  return useQuery({
    queryKey: ['get-best-seller', params],
    queryFn: async () => getTopWriters(params),
  })
}
