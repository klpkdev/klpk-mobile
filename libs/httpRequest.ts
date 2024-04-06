import axios from 'axios';
import {refreshToken} from '../services/auth/api';
import {useAuth} from '../store';
import { BASE_URL } from '../constant';
const {getState} = useAuth;

export const httpRequest = () => {
  const instance = axios.create({
    baseURL: `${BASE_URL}/api`,
  });
  let count = 0;

  instance.interceptors.request.use(
    function (config: any) {
      const accessToken = getState().token;
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
      return config;
    },
    function (error: any) {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    function (response: any) {
      return response;
    },
    async function (error: any) {
      const originalRequest = error.config;
      if (
        error?.response?.status === 401 &&
        count < 2 &&
        !originalRequest?._retry
      ) {
        count += 1;
        originalRequest._retry = true;
        const refreshTokenCurrent = getState().refreshToken;
        const data: any = await refreshToken(refreshTokenCurrent);
        getState().login({
          token: data?.token,
          expirationDate: data?.expirationDate,
          refreshToken: '',
          isLogin: true,
        });
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${data?.token}`;
        return instance(originalRequest);
      } else if (
        error?.response?.status === 401 &&
        error?.config?.method === 'get' &&
        !originalRequest._retry &&
        count >= 2
      ) {
        getState().logout();
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export default httpRequest();
