import * as s from 'superstruct';

import { Member, SMember } from './member';
import { BasePlatformData, SBasePlatformData, SCreatorID, SName, SPlatform, SProjectID, STeamID, SVersionID } from './shared';

export const SProjectPrototypeData = s.object({
  name: s.string(),
  locales: s.array(s.string()),
});

export type ProjectPrototypeData<L extends string> = Omit<s.StructType<typeof SProjectPrototypeData>, 'locales'> & {
  locales: L[];
};

export const SProjectPrototype = s.object({
  data: SProjectPrototypeData,
});

export type ProjectPrototype<L extends string> = Omit<s.StructType<typeof SProjectPrototypeData>, 'data'> & {
  data: ProjectPrototypeData<L>;
};

export enum ProjectPrivacy {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export const SProject = s.object({
  _id: SProjectID,
  teamID: STeamID,
  creatorID: SCreatorID,

  name: SName,
  image: s.optional(s.string()),
  members: s.array(SMember),
  privacy: s.optional(s.enums([ProjectPrivacy.PRIVATE, ProjectPrivacy.PUBLIC])),
  platform: SPlatform,
  prototype: SProjectPrototype,
  devVersion: s.optional(SVersionID),
  liveVersion: s.optional(SVersionID),
  platformData: SBasePlatformData,
});

export type Project<P extends BasePlatformData, M extends BasePlatformData, L extends string = string> = Omit<
  s.StructType<typeof SProject>,
  'platformData' | 'members' | 'prototype'
> & {
  members: Member<M>[];
  prototype?: ProjectPrototype<L>;
  platformData: P;
};
