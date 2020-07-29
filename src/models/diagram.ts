import * as s from 'superstruct';

import { DiagramNode, SCreatorID, SDiagramID, SDiagramNode, SName, SVariable, SVersionID } from './shared';

export const SDiagram = s.object({
  _id: SDiagramID,

  name: SName,
  versionID: SVersionID,
  creatorID: SCreatorID,
  variables: s.array(SVariable),

  offsetX: s.number(),
  offsetY: s.number(),
  zoom: s.number(),
  nodes: s.array(SDiagramNode),
});

export type Diagram<N extends DiagramNode = DiagramNode> = Omit<s.StructType<typeof SDiagram>, 'nodes'> & {
  nodes: N[];
};
