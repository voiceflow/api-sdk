import axios, { AxiosInstance } from 'axios';

import { UnknownRecord } from '@/types';

type FetchOptions = {
  clientKey: string;
  apiEndpoint: string;
  authorization: string;
};

type FetchReturnType<T> = {
  data: T;
  status: number;
};

class Fetch {
  private axios: AxiosInstance;

  constructor({ clientKey, apiEndpoint, authorization }: FetchOptions) {
    this.axios = axios.create({
      baseURL: apiEndpoint.endsWith('/') ? apiEndpoint : `${apiEndpoint}/`,
      headers: { clientKey, authorization },
    });
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

  public async patch<T extends unknown>(url: string, body?: unknown): Promise<FetchReturnType<T>> {
    const { data, status } = await this.axios.patch<T>(url, body);

    return { data, status };
  }

  /**
   * Updates the data by the provided path and value, variables can be used in the path
   * @example
   * // return Promise<number>
   * fetch.granularPatch<number>('/endpoint', '[$creatorID].platformData.vendors[$vendorID].skillID', 5678, { vendorID: "234", creatorID: "123" })
   */
  public async granularPatch<T extends unknown>(
    url: string,
    path: string,
    value: T,
    pathVariables?: Record<string, string | number>
  ): Promise<FetchReturnType<T>> {
    const { data, status } = await this.axios.patch<T>(url, { path, value, pathVariables });

    return { data, status };
  }

  public async delete<T extends unknown>(url: string): Promise<FetchReturnType<T>> {
    const { data, status } = await this.axios.delete<T>(url);

    return { data, status };
  }
}

export default Fetch;
