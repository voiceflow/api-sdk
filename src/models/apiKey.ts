import * as s from 'superstruct';

import { SAPIKeyID, SCreatorID, SWorkspaceID } from './shared';

export const SAPIkey = s.object({
  _id: SAPIKeyID,

  // this will never show up on the client side
  // key: s.string(),
  workspaceID: SWorkspaceID,
  creatorID: SCreatorID,

  name: s.string(),
  permissions: s.array(s.string()),
  scopes: s.array(s.string()),
  data: s.optional(s.object()),
});

export type APIKey = s.StructType<typeof SAPIkey>;
