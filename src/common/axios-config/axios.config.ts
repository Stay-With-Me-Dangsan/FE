import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IResConfig } from '../../types/res.config';
import { getDefaultStore } from 'jotai';
import { jwtAtom, jwtStore } from '../../store';

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
      baseURL: `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`,
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

        if (error.response?.status === 302) {
          const { redirect } = error.response.data;

          window.location.href = redirect;
        } else if (error.response?.status === 400) {
          const { message } = error.response.data;
          alert(message);
        } else if (error.response?.status === 401) {
          try {
            const refreshResponse = await axios.post(
              `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/user/refresh`,
              {},
              { withCredentials: true },
            );

            const newAccessToken = refreshResponse.data.data.accessToken;

            store.set(jwtAtom, newAccessToken);

            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return this._axiosInstance(originalRequest);
          } catch (refreshError) {
            console.error('Refresh token 요청 실패:', refreshError);
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
