import {httpRequest} from '../../libs/httpRequest';

const fetch = httpRequest();

export const topups = (data: any) => {
  return fetch.post('/topups',data)
}

export const purchaseIap = (data: any) => {
  return fetch.post('/topups/apple-iap',data)
}
