import {useQuery} from '@tanstack/react-query';
import {IParamsLibraries} from '../../interfaces/libraries';
import {getLibraries} from './api';

export const useGetLibraries = (params: IParamsLibraries) => {
  console.log('params : ', params);
  return useQuery({
    queryKey: ['get-libraries', params],
    queryFn: async () => getLibraries(params),
  });
};
