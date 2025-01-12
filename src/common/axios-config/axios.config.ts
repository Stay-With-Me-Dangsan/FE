import axios, { AxiosInstance } from 'axios';
import { ResponseConfig } from '../../types/interface/dto';

// interface IRequest {
//   method: string;
//   url: string;
//   params: Record<string, string | number> | null;
//   data: unknown | null;
//   headers: {};
// }

interface IGetRequest {
  url: string;
  params?: Record<string, string | number>;
  headers?: {};
}

interface IPostRequest {
  url: string;
  data: unknown;
  headers?: {};
}

interface IPutRequest {
  url: string;
  data: unknown;
  headers?: {};
}

interface IDeleteRequest {
  url: string;
  headers?: {};
}

interface IPatchRequest {
  url: string;
  data: unknown;
  headers?: {};
}

export class AxiosConfig {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/${process.env.NEXT_PUBLIC_GLOBAL_PREFIX}`,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    this.axiosInstance.interceptors.request.use();

    this.axiosInstance.interceptors.response.use();
  }

  // private static _axiosInstance = axios.create({
  //   baseURL: `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/${process.env.NEXT_PUBLIC_GLOBAL_PREFIX}`,
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

  protected async get<T, D>({ url, params = {}, headers = {} }: IGetRequest) {
    return await this.axiosInstance.get<ResponseConfig<T>>(url, { params, headers });
  }

  protected async post<T, D>({ url, data, headers = {} }: IPostRequest) {
    return await this.axiosInstance.post<ResponseConfig<T>>(url, data, { headers });
  }

  protected async put<T, D>({ url, data, headers = {} }: IPostRequest) {
    return await this.axiosInstance.put<ResponseConfig<T>>(url, data, { headers });
  }

  protected async patch<T, D>({ url, data, headers = {} }: IPostRequest) {
    return await this.axiosInstance.patch<ResponseConfig<T>>(url, data, { headers });
  }

  protected async delete<T, D>({ url, headers = {} }: IDeleteRequest) {
    return await this.axiosInstance.delete<ResponseConfig<T>>(url, { headers });
  }
}
