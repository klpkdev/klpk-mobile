import {IPurchasesPayload} from '../../interfaces/purchases'
import {httpRequest} from '../../libs/httpRequest';

const fetch = httpRequest();

export const purchases = (data: IPurchasesPayload) => {
  return fetch.post(`/purchases`, data)
}
