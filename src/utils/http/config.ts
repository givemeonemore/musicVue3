/*
 * @Author: zhouran
 * @Date: 2022-05-10 10:57:23
 * @LastEditors: zhouran
 * @LastEditTime: 2022-06-08 00:53:31
 * @Description:
 */
import { AxiosRequestConfig } from 'axios/index';
import { excludeProps } from './utils';
/**
 * 默认配置
 */
export const defaultConfig: AxiosRequestConfig = {
  // baseURL: 'http://124.223.98.68:3000',
  baseURL: `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_BASE_API}`,
  //10秒超时
  timeout: 10000,
  // 跨域处理
  withCredentials: true,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
};

export function genConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
  if (!config) {
    return defaultConfig;
  }

  const { headers } = config;
  if (headers && typeof headers === 'object') {
    defaultConfig.headers = {
      ...defaultConfig.headers,
      ...headers,
    };
  }
  return { ...excludeProps(config!, 'headers'), ...defaultConfig };
}

export const METHODS = ['post', 'get', 'put', 'delete', 'option', 'patch'];
