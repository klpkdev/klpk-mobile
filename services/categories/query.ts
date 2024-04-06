import {useQuery} from '@tanstack/react-query'
import {categories} from './api'

export const useCategories = () => {
  return useQuery({queryKey: ['categories'], queryFn: categories})
}
