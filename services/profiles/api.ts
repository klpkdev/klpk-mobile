import {httpRequest} from '../../libs/httpRequest';

const fetch = httpRequest();

export const getProfileById = (id: string) => {
  return fetch.get(`/profiles/${id}`);
};

export const getFollowers = (id: string) => {
  return fetch.get(`/profiles/${id}/followers`);
};

export const getFollowing = (id: string) => {
  return fetch.get(`/profiles/${id}/followings`);
};
