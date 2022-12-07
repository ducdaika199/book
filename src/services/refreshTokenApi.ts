import { AxiosInstance } from 'axios';
import { getCookie } from 'cookies-next';
import { REFRESH_TOKEN } from './axios';

// TODO: Implement API refresh token here
export const refreshTokenAPI = async (instance: AxiosInstance) => {
  const res = await instance.post('/refresh-token', {
    REFRESH_TOKEN: getCookie(REFRESH_TOKEN),
  });
  return res;
};
