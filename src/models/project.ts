import * as s from 'superstruct';

import { Member, SMember } from './member';
import { BasePlatformData, SBasePlatformData, SCreatorID, SName, SPlatform, SProjectID, STeamID, SVersionID } from './shared';

export enum ProjectPrototypeNLPType {
  LUIS = 'LUIS',
}

export const SProjectPrototypeLuis = s.object({
  type: s.enums([ProjectPrototypeNLPType.LUIS]),
  appID: s.string(),
});

type ProjectPrototypeNLPBase<T extends string, S extends s.Struct<any>> = { type: T } & Omit<s.StructType<S>, 'type'>;

export type ProjectPrototypeLuis = ProjectPrototypeNLPBase<ProjectPrototypeNLPType.LUIS, typeof SProjectPrototypeLuis>;

export const SProjectPrototypeNLP = s.union([SProjectPrototypeLuis]);

export type ProjectPrototypeNLP = ProjectPrototypeLuis;

export const SProjectPrototype = s.object({
  nlp: s.optional(SProjectPrototypeNLP),
  data: s.object(),
});

export type ProjectPrototype = Omit<s.StructType<typeof SProjectPrototype>, 'nlp'> & {
  nlp: ProjectPrototypeNLP;
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
  prototype: s.optional(SProjectPrototype),
  devVersion: s.optional(SVersionID),
  liveVersion: s.optional(SVersionID),
  platformData: SBasePlatformData,
});

export type Project<P extends BasePlatformData, M extends BasePlatformData> = Omit<s.StructType<typeof SProject>, 'platformData' | 'members'> & {
  members: Member<M>[];
  platformData: P;
};
