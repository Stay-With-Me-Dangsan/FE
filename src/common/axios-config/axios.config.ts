import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { IResConfig } from '../../types/res.config';
import { getDefaultStore, useSetAtom } from 'jotai';
import { jwtAtom, clearJwtAtom } from '../../store';

interface IGetReq<D> {
  url: string;
  params?: D;
  headers?: AxiosRequestConfig['headers'];
}

interface IPostReq<D> {
  url: string;
  data: D;
  headers?: AxiosRequestConfig['headers'];
}

interface IPutReq<D> {
  url: string;
  data: D;
  headers?: AxiosRequestConfig['headers'];
}

interface IDeleteReq<D> {
  url: string;
  params?: D;
  headers?: AxiosRequestConfig['headers'];
}

interface IPatchReq<D> {
  url: string;
  data: D;
  headers?: AxiosRequestConfig['headers'];
}

export class AxiosConfig {
  private readonly _axiosInstance: AxiosInstance;

  constructor() {
    this._axiosInstance = axios.create({
      baseURL: `${window.location.origin}/${process.env.REACT_APP_API_PREFIX}`,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    this._axiosInstance.interceptors.request.use(
      (config) => {
        const store = getDefaultStore();
        const token = store.get(jwtAtom);

        if (token && config.headers) {
          config.headers.set('Authorization', `Bearer ${token}`);
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this._axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        const store = getDefaultStore();

        //인증 필요한 요청등
        const isAuthRequired = [
          '/api/user/mypage',
          '/api/user/logout',
          '/api/user/update',
          '/api/user/delete',
          '/api/user/refresh',
          '/api/house/register',
          '/api/house/update',
          '/api/house/delete',
          '/api/house/reserve',
          '/api/house/like',
        ].some((path) => originalRequest.url?.includes(path));

        if (!isAuthRequired && error.response?.status === 401) {
          // 인증 필요 없는 요청에서의 401은 무시
          return Promise.reject(error);
        }

        if (error.response?.status === 302) {
          const { redirect } = error.response.data;

          window.location.href = redirect;
        } else if (error.response?.status === 400) {
          const { message } = error.response.data;
          alert(message);
        } else if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshResponse = await axios.post(
              `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_PREFIX}/user/refresh`,
              {},
              { withCredentials: true },
            );

            const newAccessToken = refreshResponse.data.data.accessToken;

            store.set(jwtAtom, newAccessToken);
            localStorage.setItem('accessToken', newAccessToken);

            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return this._axiosInstance(originalRequest);
          } catch (refreshError: unknown) {
            const axiosError = refreshError as AxiosError;

            console.error('Refresh token 요청 실패:', axiosError);

            // if (axiosError.response?.status === 401) {
            //   alert('세션이 만료되었습니다. 다시 로그인해주세요.');
            // }
            localStorage.removeItem('accessToken');
            store.set(clearJwtAtom);
            window.location.href = '/';
          }
        }

        return Promise.reject(error);
      },
    );
  }

  protected async get<T, D>({ url, params, headers }: IGetReq<D>) {
    return await this._axiosInstance.get<IResConfig<T>>(url, { params, headers });
  }

  protected async post<T, D>({ url, data, headers }: IPostReq<D>) {
    return await this._axiosInstance.post<IResConfig<T>>(url, data, { headers });
  }

  protected async put<T, D>({ url, data, headers }: IPutReq<D>) {
    return await this._axiosInstance.put<IResConfig<T>>(url, data, { headers });
  }

  protected async delete<T, D>({ url, params, headers }: IDeleteReq<D>) {
    return await this._axiosInstance.delete<IResConfig<T>>(url, { params, headers });
  }

  protected async patch<T, D>({ url, data, headers }: IPatchReq<D>) {
    return await this._axiosInstance.patch<IResConfig<T>>(url, data, { headers });
  }
}
