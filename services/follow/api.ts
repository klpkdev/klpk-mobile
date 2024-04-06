import {httpRequest} from '../../libs/httpRequest';

const fetch = httpRequest();

export const follow = (id: string) => {
  return fetch.post(`/follow/users/${id}`)
}

export const unFollow = (id: string) => {
  return fetch.delete(`/follow/users/${id}`)
}
