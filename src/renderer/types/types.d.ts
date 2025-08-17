import {  Edge, OnConnect, OnEdgesChange, OnNodesChange } from '@xyflow/react';
import { SynapNode } from 'types/types';

export type AppState = {
  selectedNode: SynapNode | null;
  nodes: SynapNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<SynapNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: SynapNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: SynapNode) => void;
};
