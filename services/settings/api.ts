import {httpRequest} from '../../libs/httpRequest';

const fetch = httpRequest();

export const getCoinRate = () => {
  return fetch.get('/settings/coin-rate')
}

export const getPricing = () => {
    return fetch.get('/settings/pricing')
  }
