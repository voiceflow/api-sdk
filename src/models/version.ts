import * as s from 'superstruct';

import { Command, SCommand, SIntent, SSlot } from '@/models';
import { UnknownRecord } from '@/types';
import { dynamicObject } from '@/utils';

import { SCreatorID, SDiagramID, SName, SProjectID, SVariable, SVersionID } from './shared';

export const SVersionPlatformDataSettings = s.object();

export const SVersionPlatformDataPublishing = s.object();

// TODO: do not forget to add new field to the StrictVersionPlatformData union
export const SVersionPlatformData = dynamicObject({
  slots: s.array(SSlot),
  intents: s.array(SIntent),
  settings: SVersionPlatformDataSettings,
  publishing: SVersionPlatformDataPublishing,
});

export type StrictVersionPlatformData<S extends UnknownRecord = UnknownRecord, P extends UnknownRecord = UnknownRecord> = Pick<
  s.StructType<typeof SVersionPlatformData>,
  'slots' | 'intents'
> & {
  settings: S;
  publishing: P;
};

export type VersionPlatformData<S extends UnknownRecord = UnknownRecord, P extends UnknownRecord = UnknownRecord> = UnknownRecord &
  StrictVersionPlatformData<S, P>;

export const SVersionPrototypeStackFrame = s.object({
  nodeID: s.optional(s.nullable(s.string())),
  programID: s.string(),

  storage: s.optional(s.object()),
  commands: s.optional(s.array(SCommand)),
  variables: s.optional(s.object()),
});

export type VersionPrototypeStackFrame<C extends Command = Command> = Omit<s.StructType<typeof SVersionPrototypeStackFrame>, 'commands'> & {
  commands?: C[];
};

export const SVersionPrototypeContext = s.partial({
  turn: s.object(),
  stack: s.array(SVersionPrototypeStackFrame),
  storage: s.object(),
  variables: s.object(),
});

export type VersionPrototypeContext<C extends Command = Command> = Omit<s.StructType<typeof SVersionPrototypeContext>, 'stack'> & {
  stack?: VersionPrototypeStackFrame<C>[];
};

export const SVersionPrototypeData = s.object({
  name: s.string(),
  locales: s.array(s.string()),
});

export type VersionPrototypeData<L extends string> = Omit<s.StructType<typeof SVersionPrototypeData>, 'locales'> & {
  locales: L[];
};

export const SVersionPrototypeModel = s.object({
  slots: s.array(SSlot),
  intents: s.array(SIntent),
});

export type VersionPrototypeModel = s.StructType<typeof SVersionPrototypeModel>;

export const SVersionPrototype = s.object({
  data: SVersionPrototypeData,
  model: SVersionPrototypeModel,
  context: SVersionPrototypeContext,
  settings: s.object(), // TODO: add types
});

export type VersionPrototype<C extends Command = Command, L extends string = string> = Omit<
  s.StructType<typeof SVersionPrototype>,
  'context' | 'data'
> & {
  data: VersionPrototypeData<L>;
  context: VersionPrototypeContext<C>;
};

export const SVersion = s.object({
  _id: SVersionID,
  creatorID: SCreatorID,
  projectID: SProjectID,

  name: SName,
  variables: s.array(SVariable),
  prototype: s.optional(SVersionPrototype),
  platformData: SVersionPlatformData,
  rootDiagramID: SDiagramID,
});

export type Version<P extends VersionPlatformData, C extends Command = Command, L extends string = string> = Omit<
  s.StructType<typeof SVersion>,
  'prototype' | 'platformData'
> & {
  prototype?: VersionPrototype<C, L>;
  platformData: P;
};
