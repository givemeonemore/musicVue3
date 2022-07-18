import Axios, {
  AxiosRequestConfig,
  Canceler,
  AxiosResponse,
  Method,
  AxiosError
} from "axios";

import { METHODS } from "./config";

export type cancelTokenType = { cancelKey: string; cancelExecutor: Canceler };

export type RequestMethods = Extract<
  Method,
  "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
>;

export interface httpRequestConfig  extends AxiosRequestConfig {
  data: any;
  url: string;
  method: any;
  beforeRequestCallback?: (request: httpRequestConfig ) => void; // 请求发送之前
  beforeResponseCallback?: (response: httpResoponse) => void; // 相应返回之前
}

export interface httpResoponse extends AxiosResponse {
  config: httpRequestConfig ;
}

export interface EnclosureHttpError extends AxiosError {
  isCancelRequest?: boolean;
}

export default class EnclosureHttp {
  cancelTokenList: Array<cancelTokenType>;
  clearCancelTokenList(): void;
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: httpRequestConfig 
  ): Promise<T>;
  post<T>(
    url: string,
    params?: T,
    config?: httpRequestConfig 
  ): Promise<T>;
  get<T>(
    url: string,
    params?: T,
    config?: httpRequestConfig 
  ): Promise<T>;
}
