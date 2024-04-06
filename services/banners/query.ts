import {useQuery} from '@tanstack/react-query'
import {getBanners} from './api'

export const useBanners = () => {
  return useQuery({queryKey: ['get-banners'], queryFn: getBanners})
}
