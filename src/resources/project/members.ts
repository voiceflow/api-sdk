import * as s from 'superstruct';

import type Fetch from '@/fetch';
import { BasePlatformData, CreatorID, Member, ProjectID, SMember, SProjectID } from '@/models';
import { UnknownRecord } from '@/types';

import BaseResource from '../base';

export const modelIDKey = 'creatorID';
export type ModelIDKey = typeof modelIDKey;

class MembersResource extends BaseResource<typeof SMember['schema'], ModelIDKey> {
  constructor(fetch: Fetch, parentResourceEndpoint: string) {
    super({
      fetch,
      schema: SMember.schema,
      modelIDKey,
      resourceEndpoint: parentResourceEndpoint,
    });
  }

  protected _getCRUDEndpoint(id: ProjectID): string {
    return `${this._getEndpoint()}/${id}/members`;
  }

  public async list<P extends Partial<Member<BasePlatformData>>>(projectID: ProjectID, fields: string[]): Promise<P[]>;

  public async list<P extends BasePlatformData>(projectID: ProjectID): Promise<Member<P>[]>;

  public async list(projectID: ProjectID, fields?: string[]) {
    s.assert(projectID, SProjectID);

    const { data } = await this.fetch.get(`${this._getCRUDEndpoint(projectID)}${this._getFieldsQuery(fields)}`);

    return data;
  }

  public async getCurrentUser<P extends Partial<Member<BasePlatformData>>>(projectID: ProjectID, fields: string[]): Promise<P>;

  public async getCurrentUser<P extends BasePlatformData>(projectID: ProjectID): Promise<Member<P>>;

  public async getCurrentUser(projectID: ProjectID, fields?: string[]) {
    s.assert(projectID, SProjectID);

    const { data } = await this.fetch.get(`${this._getEndpoint()}/${projectID}/member${this._getFieldsQuery(fields)}`);

    return data;
  }

  public async createCurrentUser<P extends BasePlatformData>(projectID: ProjectID, body: Omit<Member<P>, ModelIDKey>): Promise<Member<P>> {
    s.assert(projectID, SProjectID);
    this._assertPutAndPostBody(body);

    const { data } = await this.fetch.post<Member<P>>(this._getCRUDEndpoint(projectID), body);

    return data;
  }

  public async updateCurrentUser<P extends BasePlatformData>(projectID: ProjectID, body: Omit<Member<P>, ModelIDKey>): Promise<Member<P>> {
    s.assert(projectID, SProjectID);
    this._assertPutAndPostBody(body);

    const { data } = await this.fetch.put<Member<P>>(this._getCRUDEndpoint(projectID), body);

    return data;
  }

  public async granularUpdateCurrentUser<P>(
    projectID: ProjectID,
    path: string,
    value: P,
    pathVariables?: Record<string, string | number>
  ): Promise<P> {
    s.assert(projectID, SProjectID);

    const { data } = await this.fetch.granularPatch<P>(this._getCRUDEndpoint(projectID), path, value, pathVariables);

    return data;
  }

  public async deleteCurrentUser(projectID: ProjectID): Promise<CreatorID> {
    s.assert(projectID, SProjectID);

    const { data } = await this.fetch.delete<CreatorID>(this._getCRUDEndpoint(projectID));

    return data;
  }
}

export default MembersResource;
