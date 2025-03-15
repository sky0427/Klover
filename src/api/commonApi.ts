import {ApiResponse} from '@/types/domain';
import {axiosInstance} from '@/utils/axios';
import {AxiosRequestConfig, AxiosResponse} from 'axios';

const GET = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<ApiResponse<T>>> => {
  const response = await axiosInstance.get(url, config);
  return response;
};

const POST = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<ApiResponse<T>>> => {
  const response = await axiosInstance.post(url, data, config);
  return response;
};

const PATCH = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<ApiResponse<T>>> => {
  const response = await axiosInstance.patch(url, data, config);
  return response;
};

const DELETE = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<ApiResponse<T>>> => {
  const response = await axiosInstance.delete(url, config);
  return response;
};

const PUT = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<ApiResponse<T>>> => {
  const response = await axiosInstance.put(url, data, config);
  return response;
};

export {DELETE, GET, PATCH, POST, PUT};
