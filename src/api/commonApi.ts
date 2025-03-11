import {ApiResponse, KloverPage} from '@/types/domain';
import {axiosInstance} from '@/utils/axios';
import {AxiosResponse, AxiosRequestConfig} from 'axios';

const GET = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  const response = await axiosInstance.get<ApiResponse<T>>(url, config);
  return response.data;
};

const POST = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<ApiResponse<T>>> => {
  const response = await axiosInstance.post(url, data, config);
  return response?.data;
};

export {GET, POST};
