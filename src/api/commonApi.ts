import {ApiResponse} from '@/types/type';
import {axiosInstance} from '@/utils/axios';
import {AxiosResponse, AxiosRequestConfig} from 'axios';

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

export {GET, POST};
