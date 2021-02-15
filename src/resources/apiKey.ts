import type Fetch from '@/fetch';
import { APIKey, SAPIkey } from '@/models';

import CrudResource from './crud';

const ENDPOINT = 'api-keys';

export const modelIDKey = '_id';
export type ModelIDKey = typeof modelIDKey;

class APIKeyResource extends CrudResource<typeof SAPIkey['schema'], ModelIDKey, APIKeyResource> {
  constructor(fetch: Fetch, { resourceEndpoint = ENDPOINT }: { resourceEndpoint?: string } = {}) {
    super({
      fetch,
      clazz: APIKeyResource,
      schema: SAPIkey.schema,
      modelIDKey,
      resourceEndpoint,
    });
  }

  public async get(id: string) {
    return super._getByID<APIKey>(id);
  }

  public async create(workspaceID: string, body: Partial<APIKey>): Promise<APIKey> {
    return super._post({ ...body, workspaceID } as APIKey);
  }

  public async update(id: string, body: Pick<APIKey, 'name' | 'permissions' | 'scopes' | 'data'>): Promise<Partial<APIKey>> {
    return super._put(id, body as APIKey);
  }

  public async delete(id: string): Promise<string> {
    return super._delete(id);
  }
}

export default APIKeyResource;
