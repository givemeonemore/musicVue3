import Axios, { AxiosInstance, AxiosResponse, CancelTokenStatic, AxiosRequestConfig } from 'axios';
import { httpRequestConfig, cancelTokenType, RequestMethods } from './types';
import { transformConfigByMethod } from './utils';
import { genConfig } from './config';
class Request {
  // axios 实例，后续的请求都是从这儿出
  // 保存当前Axios实例对象
  private static instance: AxiosInstance = Axios.create(genConfig());

  // axios取消对象
  private CancelToken: CancelTokenStatic = Axios.CancelToken;

  // 取消的凭证数组
  private sourceTokenList: Array<cancelTokenType> = [];

  // 记录当前这一次cancelToken的key
  private currentCancelTokenKey = '';

  private beforeRequestCallback: httpRequestConfig['beforeRequestCallback'] = undefined;

  private beforeResponseCallback: httpRequestConfig['beforeResponseCallback'] = undefined;

  public get cancelTokenList(): Array<cancelTokenType> {
    return this.sourceTokenList;
  }

  public set cancelTokenList(value) {
    throw new Error('cancelTokenList不允许赋值');
  }

  /**
   * @description 生成唯一取消key
   * @param config axios配置
   * @returns string
   */
  // eslint-disable-next-line class-methods-use-this
  private static genUniqueKey(config: httpRequestConfig): string {
    return `${config.url}--${JSON.stringify(config.data)}`;
  }

  constructor() {
    // 添加类拦截器
    Request.instance.interceptors.request.use(
      (res: AxiosRequestConfig) => {
        // 全局请求拦截器
        return res;
      },
      (err: any) => err,
    );
    Request.instance.interceptors.response.use(
      // 因为我们接口的数据都在res.data下，所以我们直接返回res.data
      (res: AxiosResponse) => {
        // 全局响应拦截器
        return res.data;
      },
      (err: any) => err,
    );
  }

  public request<T>(method: RequestMethods, url: string, param?: AxiosRequestConfig, axiosConfig?: httpRequestConfig): Promise<T> {
    const config = transformConfigByMethod(param, {
      method,
      url,
      ...axiosConfig,
    } as httpRequestConfig);
    // 单独处理自定义请求/响应回调
    if (axiosConfig?.beforeRequestCallback) {
      this.beforeRequestCallback = axiosConfig.beforeRequestCallback;
    }
    if (axiosConfig?.beforeResponseCallback) {
      this.beforeResponseCallback = axiosConfig.beforeResponseCallback;
    }
    return new Promise((resolve, reject) => {
      Request.instance
        .request(config)
        .then((response: undefined) => {
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  public post<T>(url: string, params?: T, config?: httpRequestConfig): Promise<T> {
    return this.request<T>('post', url, params, config);
  }

  public get<T>(url: string, params?: T, config?: httpRequestConfig): Promise<T> {
    return this.request<T>('get', url, params, config);
  }
}

const http = new Request();
export default http;
