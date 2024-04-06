import { ITransactionParams } from '../../interfaces/transactions'
import {httpRequest} from '../../libs/httpRequest';

const fetch = httpRequest();

export const getTransactions = (params: ITransactionParams) => {
  return fetch.get('/transactions',{params})
}
