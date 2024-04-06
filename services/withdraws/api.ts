import { IPayloadWithdraw } from '../../interfaces/withdraws'
import {httpRequest} from '../../libs/httpRequest';

const fetch = httpRequest();

export const createWithdraws = (data: IPayloadWithdraw) => {
  return fetch.post('/withdraws',data)
}
