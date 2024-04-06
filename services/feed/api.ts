import {IParamsFeed, IParamsTopWriter} from '../../interfaces/feed'
import {httpRequest} from '../../libs/httpRequest';

const fetch = httpRequest();

export const getBestSeller = (params: IParamsFeed) => {
  return fetch.get('/feed/best-seller', {params})
}

export const getTopWriters = (params: IParamsTopWriter) => {
  return fetch.get('/feed/top-writers', {params})
}
