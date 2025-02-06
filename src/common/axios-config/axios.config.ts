import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ResponseConfig } from '../../types/interface/dto';

// interface IRequest {
//   method: string;
//   url: string;
//   params: Record<string, string | number> | null;
//   data: unknown | null;
//   headers: {};
// }

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
      baseURL: `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${process.env.REACT_APP_API_URL_PREFIX}`,
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

  // private static _axiosInstance = axios.create({
  //   baseURL: `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${process.env.REACT_APP_GLOBAL_PREFIX}`,
  //   headers: { 'Content-Type': 'application/json' },
  //   withCredentials: true,
  // });

  // private static async _request<T, D>({
  //   method,
  //   url,
  //   params,
  //   data,
  //   headers,
  // }: IRequest): Promise<AxiosResponse<T, D> | null> {
  //   try {
  //     return await this._request({ method, url, data, params, headers });
  //   } catch (error: unknown) {
  //     if (axios.isAxiosError(error)) {
  //       switch (error.response?.status) {
  //         case 400:
  //           break;
  //         case 401:
  //           break;
  //         case 403:
  //           break;
  //         case 404:
  //           break;
  //         case 500:
  //           break;
  //         default:
  //           break;
  //       }
  //
  //       throw error;
  //     } else {
  //       return null;
  //     }
  //   }
  // }

  /**
   * T - Generic, Response Data Type
   * D - Generic, Request Data Type
   */
  // static async get<T, D>({ url, params = {}, headers = {} }: IGetRequest): Promise<AxiosResponse<T, D> | null> {
  //   return await this._request<T, D>({ method: 'get', url, params, data: null, headers });
  // }

  // static async post<T, D>({ url, data, headers = {} }: IPostRequest): Promise<AxiosResponse<T, D> | null> {
  //   return await this._request({ method: 'post', url, params: null, data, headers });
  // }

  // static async put<T, D>({ url, data, headers = {} }: IPutRequest): Promise<AxiosResponse<T, D> | null> {
  //   return await this._request({ method: 'put', url, params: null, data, headers });
  // }

  // static async delete<T, D>({ url, headers = {} }: IDeleteRequest): Promise<AxiosResponse<T, D> | null> {
  //   return await this._request({ method: 'delete', url, params: null, data: {}, headers });
  // }

  // static async patch<T, D>({ url, data, headers = {} }: IPatchRequest): Promise<AxiosResponse<T, D> | null> {
  //   return await this._request({ method: 'patch', url, params: null, data, headers });
  // }

  // static async renewAccessToken() {}

  protected async get<T, D>({ url, params, headers }: IGetRequest<D>) {
    return await this._axiosInstance.get<ResponseConfig<T>>(url, { params, headers });
  }

  protected async post<T, D>({ url, data, headers }: IPostRequest<D>) {
    return await this._axiosInstance.post<ResponseConfig<T>>(url, data, { headers });
  }

  protected async put<T, D>({ url, data, headers }: IPostRequest<D>) {
    return await this._axiosInstance.put<ResponseConfig<T>>(url, data, { headers });
  }

  protected async delete<T, D>({ url, data, headers }: IDeleteRequest<D>) {
    return await this._axiosInstance.delete<ResponseConfig<T>>(url, { data, headers });
  }

  protected async patch<T, D>({ url, data, headers }: IPostRequest<D>) {
    return await this._axiosInstance.patch<ResponseConfig<T>>(url, data, { headers });
  }
}
