import {useQuery} from '@tanstack/react-query'
import {getCoinRate, getPricing} from './api'

export const useGetCoinRate = () => {
  return useQuery({queryKey: ['get-coin-rate'], queryFn: getCoinRate})
}

export const useGetPricing = () => {
  return useQuery({queryKey: ['get-pricing'], queryFn: getPricing})
}
