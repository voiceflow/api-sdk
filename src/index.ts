import * as s from 'superstruct';

import { Client, PublicClient } from '@/client';
import type { FetchConfig } from '@/fetch';

export type { Client, PublicClient } from '@/client';
export type { UnknownRecord, ArrayElement, Flatten } from '@/types';
export * from '@/models';

export const SOptions = s.object({
  clientKey: s.string(),
  apiEndpoint: s.string(),
});

export const SGenerateClientOptions = s.type({
  authorization: s.string(),
});

class ApiSDK {
  private clientKey: string;

  private apiEndpoint: string;

  constructor({ clientKey, apiEndpoint }: s.StructType<typeof SOptions>) {
    s.assert({ clientKey, apiEndpoint }, SOptions);

    this.clientKey = clientKey;
    this.apiEndpoint = apiEndpoint;
  }

  public generatePublicClient(): PublicClient {
    return new PublicClient({
      clientKey: this.clientKey,
      apiEndpoint: this.apiEndpoint,
    });
  }

  public generateClient({ authorization, fetchConfig }: s.StructType<typeof SGenerateClientOptions> & { fetchConfig?: FetchConfig }): Client {
    s.assert({ authorization }, SGenerateClientOptions);

    return new Client({
      clientKey: this.clientKey,
      fetchConfig,
      apiEndpoint: this.apiEndpoint,
      authorization,
    });
  }
}

export default ApiSDK;
