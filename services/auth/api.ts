import {httpRequest} from '../../libs/httpRequest';

const fetch = httpRequest();

export const login = (data: any) => {
  debugger;
  return fetch.post('/auth/login', data);
};

export const register = (data: any) => {
  return fetch.post('/auth/register', data);
};

export const loginGoogle = (data: any) => {
  return fetch.post('/auth/login-google', data);
};

export const refreshToken = (data: any) => {
  return fetch.post('/auth/refresh-token', data);
};

export const resetPassword = (data: any) => {
  return fetch.post('/auth/recover-password', data);
};
