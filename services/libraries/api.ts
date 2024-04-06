import {IParamsLibraries} from '../../interfaces/libraries'
import {httpRequest} from '../../libs/httpRequest';

const fetch = httpRequest();

export const getLibraries = (params: IParamsLibraries) => {
  return fetch.get('/libraries', {params})
}
