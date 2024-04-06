import {useQuery} from '@tanstack/react-query'
import {coinPackages} from './api'

export const useCoinPackages = () => {
  return useQuery({queryKey: ['coin-packages'], queryFn: coinPackages})
}
