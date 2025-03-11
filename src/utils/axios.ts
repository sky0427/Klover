import axios from 'axios';
import {Platform} from 'react-native';

const axiosInstance = axios.create({
  baseURL: 'https://api.klover.letzgo.site/api/v1',
  // Platform.OS === 'android'
  //   ? 'http://10.0.2.2:8080'
  //   : 'http://localhost:8080',
  // withCredentials: true,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

const setHeader = (key: string, value: string) => {
  axiosInstance.defaults.headers.common[key] = value;
};

const removeHeader = (key: string) => {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }
  delete axiosInstance.defaults.headers.common[key];
};

export {axiosInstance, setHeader, removeHeader};
