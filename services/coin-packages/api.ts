import {httpRequest} from '../../libs/httpRequest';

const fetch = httpRequest();

export const coinPackages = () => {
  return fetch.get('/coin-packages')
}
