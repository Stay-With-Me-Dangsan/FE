import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ResponseConfig } from '../../types/interface/dto';

interface IGetRequest<D> {
  url: string;
  params?: D;
  headers?: AxiosRequestConfig['headers'];
}

interface IPostRequest<D> {
  url: string;
  data: D;
  headers?: AxiosRequestConfig['headers'];
}

interface IPutRequest<D> {
  url: string;
  data: D;
  headers?: AxiosRequestConfig['headers'];
}

interface IDeleteRequest<D> {
  url: string;
  data?: D;
  headers?: AxiosRequestConfig['headers'];
}

interface IPatchRequest<D> {
  url: string;
  data: D;
  headers?: {};
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
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  /**
   * T - Generic, Response Data Type
   * D - Generic, Request Data Type
   */

  protected async get<T, D>({ url, params, headers }: IGetRequest<D>) {
    return await this._axiosInstance.get<ResponseConfig<T>>(url, { params, headers });
  }

  protected async post<T, D>({ url, data, headers }: IPostRequest<D>) {
    return await this._axiosInstance.post<ResponseConfig<T>>(url, data, { headers });
  }

  protected async put<T, D>({ url, data, headers }: IPutRequest<D>) {
    return await this._axiosInstance.put<ResponseConfig<T>>(url, data, { headers });
  }

  protected async delete<T, D>({ url, data, headers }: IDeleteRequest<D>) {
    return await this._axiosInstance.delete<ResponseConfig<T>>(url, { data, headers });
  }

  protected async patch<T, D>({ url, data, headers }: IPatchRequest<D>) {
    return await this._axiosInstance.patch<ResponseConfig<T>>(url, data, { headers });
  }
}
