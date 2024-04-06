import {httpRequest} from '../../libs/httpRequest';

const fetch = httpRequest();

export const getBanners = () => {
  return fetch.get('/banners')
}
