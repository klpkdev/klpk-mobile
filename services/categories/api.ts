import {httpRequest} from '../../libs/httpRequest';

const fetch = httpRequest();

export const categories = () => {
  return fetch.get('/categories')
}
