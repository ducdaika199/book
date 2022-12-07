import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getCookie } from 'cookies-next';
import { refreshTokenAPI } from './refreshTokenApi';

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createService = (
  baseURL?: string,
  contentType = 'application/json',
  authToken?: string,
): AxiosInstance => {
  return interceptAuth(baseConfig(baseURL, contentType), authToken);
};

const baseConfig = (baseURL?: string, contentType = 'application/json') => {
  return {
    baseURL,
    headers: {
      'Accept-Language': 'en-US',
      'Content-Type': contentType,
    },
  };
};

const interceptAuth = (config: AxiosRequestConfig, authToken?: string) => {
  const instance = axios.create(config);
  instance.interceptors.request.use(cf => {
    const token = authToken ? authToken : getCookie(ACCESS_TOKEN);
    if (token && cf?.headers) {
      cf.headers['Authorization'] = 'Bearer ' + token;
    }
    return cf;
  });

  function createAxiosResponseInterceptor() {
    const interceptor = instance.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 403) {
          return Promise.reject(error);
        }
        if (error.response.status !== 401) {
          return Promise.reject(error);
        }

        axios.interceptors.response.eject(interceptor);
        refreshTokenAPI(instance)
          .then(res => interceptAuth(config, res.data[ACCESS_TOKEN]))
          .catch(() => createAxiosResponseInterceptor());
      },
    );
  }
  createAxiosResponseInterceptor();
  return instance;
};

export const instance = createService(BASE_URL);
