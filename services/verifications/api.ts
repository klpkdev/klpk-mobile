import { IVerificationPayload } from '../../interfaces/verification'
import {httpRequest} from '../../libs/httpRequest';

const fetch = httpRequest();

export const createVerification = (data: IVerificationPayload) => {
  return fetch.post('/verifications',data)
}

export const updateVerification = (data: IVerificationPayload) => {
  return fetch.put(`/verifications/${data?.id}`,data)
}
