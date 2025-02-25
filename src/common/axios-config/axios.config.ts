<<<<<<< Updated upstream
import axios, { AxiosInstance } from 'axios';
import { ResponseConfig } from '../../types/interface/dto';
=======
import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { IResConfig } from '../../types/interface/res.config';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
  private readonly axiosInstance: AxiosInstance;
=======
  private static instance: AxiosConfig;
  private readonly _axiosInstance: AxiosInstance;
>>>>>>> Stashed changes

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/${process.env.NEXT_PUBLIC_GLOBAL_PREFIX}`,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

<<<<<<< Updated upstream
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
=======
    this._axiosInstance.interceptors.request.use(
      (config) => {
        //로그인시 Header에 토큰 자동추가
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this._axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        if (!error.config) {
          return Promise.reject(error);
        }

        if (error.response?.status === 401) {
          try {
            // 1️. Access Token이 만료되었으므로 Refresh Token으로 새 토큰 요청
            const refreshResponse = await this._axiosInstance.post('/user/refresh');

            const newAccessToken = refreshResponse.data.accessToken;
            localStorage.setItem('accessToken', newAccessToken);

            // 2️ 원래 요청을 새로운 Access Token으로 재시도
            error.config.headers = error.config.headers || {}; // ✅ headers가 undefined일 경우 초기화
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return this._axiosInstance.request(error.config);
          } catch (refreshError) {
            console.error('토큰 갱신 실패, 재로그인 필요');
            localStorage.removeItem('accessToken');
            window.location.href = '/'; // 로그인 페이지로 이동
          }
        }
        return Promise.reject(error);
      },
    );
  }

  public static getInstance(): AxiosConfig {
    if (!AxiosConfig.instance) {
      AxiosConfig.instance = new AxiosConfig();
    }
    return AxiosConfig.instance;
  }

  // AxiosInstance 반환
  getAxiosInstance(): AxiosInstance {
    return this._axiosInstance;
  }

  protected async get<T, D>({ url, params, headers }: IGetReq<D>) {
    return await this._axiosInstance.get<IResConfig<T>>(url, { params, headers });
>>>>>>> Stashed changes
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

const axiosInstance = new AxiosConfig().getAxiosInstance();
export default axiosInstance;
