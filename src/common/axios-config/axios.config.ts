import axios, { AxiosInstance, AxiosRequestHeaders, Method, AxiosResponse, AxiosError } from 'axios';

type RequestParams = {
  method: Method;
  url: string;
  data?: Record<string, any> | null;
  params?: Record<string, any> | null;
  headers?: AxiosRequestHeaders | Record<string, string>;
};

const AxiosConfigApi = (() => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${process.env.REACT_APP_GLOBAL_PREFIX}`,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  const request = async <T>({
    method,
    url,
    data = null,
    params = null,
    headers = {},
  }: RequestParams): Promise<AxiosResponse<T>> => {
    try {
      return await axiosInstance.request<T>({ method, url, data, params, headers });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const { message } = error.response?.data || {};

        switch (error.response?.status) {
          case 400:
            alert(message);
            break;
          case 401:
            alert('로그인이 필요합니다.');
            break;
          case 404:
            alert('찾을 수 없는 요청입니다.');
            break;
          case 500:
            alert('서버 오류입니다.');
            break;
          default:
            alert(message || '알 수 없는 오류가 발생했습니다.');
            break;
        }
      }

      throw error;
    }
  };

  const get = async <T>(
    url: string,
    params?: Record<string, any>,
    headers?: AxiosRequestHeaders,
  ): Promise<AxiosResponse<T>> => {
    return await request<T>({ method: 'get', url, params, headers });
  };

  const post = async <T>(
    url: string,
    data?: Record<string, any>,
    headers?: AxiosRequestHeaders,
  ): Promise<AxiosResponse<T>> => {
    return await request<T>({ method: 'post', url, data, headers });
  };

  const put = async <T>(
    url: string,
    data?: Record<string, any>,
    headers?: AxiosRequestHeaders,
  ): Promise<AxiosResponse<T>> => {
    return await request<T>({ method: 'put', url, data, headers });
  };

  const del = async <T>(
    url: string,
    params?: Record<string, any>,
    headers?: AxiosRequestHeaders,
  ): Promise<AxiosResponse<T>> => {
    return await request<T>({ method: 'delete', url, params, headers });
  };

  const patch = async <T>(
    url: string,
    data?: Record<string, any>,
    headers?: AxiosRequestHeaders,
  ): Promise<AxiosResponse<T>> => {
    return await request<T>({ method: 'patch', url, data, headers });
  };

  const setAuthorizationHeader = (token: string): void => {
    axiosInstance.defaults.headers.common['Authorization'] = `${token}`;
  };

  return {
    get,
    post,
    put,
    delete: del,
    patch,
    setAuthorizationHeader,
  };
})();

export default AxiosConfigApi;
