import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

type FetchOptions = {
  clientKey: string;
  apiEndpoint: string;
  authorization?: string;
  globalHeaders?: Record<string, string>;
};

type FetchReturnType<T> = {
  data: T;
  status: number;
};

export type PathVariables = Record<string, string | number>;

class Fetch {
  private axios: AxiosInstance;

  constructor({ clientKey, apiEndpoint, authorization, globalHeaders }: FetchOptions) {
    const config: AxiosRequestConfig = {
      baseURL: apiEndpoint.endsWith('/') ? apiEndpoint : `${apiEndpoint}/`,
      headers: { clientKey },
      withCredentials: true,
    };

    if (globalHeaders) {
      Object.assign(config.headers, globalHeaders);
    }

    if (authorization) {
      config.headers.authorization = authorization;
    }

    this.axios = axios.create(config);
  }

  public async get<T extends unknown>(url: string): Promise<FetchReturnType<T>> {
    const { data, status } = await this.axios.get<T>(url);

    return { data, status };
  }

  public async post<T extends unknown>(url: string, body?: unknown): Promise<FetchReturnType<T>> {
    const { data, status } = await this.axios.post<T>(url, body);

    return { data, status };
  }

  public async put<T extends unknown>(url: string, body?: unknown): Promise<FetchReturnType<T>> {
    const { data, status } = await this.axios.put<T>(url, body);

    return { data, status };
  }

  public async patch<T extends unknown>(url: string, body: unknown, query?: Record<string, string>): Promise<FetchReturnType<T>> {
    const { data, status } = await this.axios.patch<T>(url, body, query ? { params: query } : undefined);

    return { data, status };
  }

  public async delete<T extends unknown>(url: string): Promise<FetchReturnType<T>> {
    const { data, status } = await this.axios.delete<T>(url);

    return { data, status };
  }

  /**
   * Updates the data by the provided path and value, variables can be used in the path
   * @example
   * // return Promise<number>
   * fetch.granularPatch<number>('/endpoint', 'vendors[$vendorID].skillID', 5678, { vendorID: "234" })
   */
  public async granularPatch<T extends unknown>(url: string, path: string, value?: T, pathVariables?: PathVariables): Promise<FetchReturnType<T>> {
    const { data, status } = await this.axios.patch<T>(url, { path, value, pathVariables });

    return { data, status };
  }

  public initWithOptions({ headers }: { headers: Record<string, string> }) {
    const { clientKey, authorization, ...globalHeaders } = this.axios.defaults.headers as Record<string, string>;

    return new Fetch({
      clientKey,
      apiEndpoint: this.axios.defaults.baseURL!,
      authorization,
      globalHeaders: { ...globalHeaders, ...headers },
    });
  }
}

export default Fetch;
