import * as s from 'superstruct';

import { UnknownRecord } from '@/types';

import { SBasePlatformData, SCreatorID } from './shared';

export const SMember = s.object({
  creatorID: SCreatorID,
  platformData: SBasePlatformData,
});

export type Member<P extends UnknownRecord = UnknownRecord> = s.StructType<typeof SMember> & {
  platformData: P;
};
