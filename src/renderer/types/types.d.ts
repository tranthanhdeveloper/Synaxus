import { Node, Edge, OnConnect, OnEdgesChange, OnNodesChange, NodeProps } from '@xyflow/react';

export interface Research {
  id: string;
  name: string;
  description: string
  path: string;
  createdAt: string;
}


export interface ResearchData {
  research: {
    detail: Research
    nodes: SynapNode[];
    edges: Edge[];
  }
}

interface NodeQuestion {
  question: string;
  answer: string;
}

export type MindMapNodeEventHandlers = {
  onMarkdownChange?: (nodeId: string, newMarkdown: string) => void;
  onAIQuery?: (nodeId: string, query: string) => Promise<string>;
  onLinkNode?: (sourceNodeId: string, targetNodeId: string) => void;
  onSelectNode?: (nodeId: string) => void;
  onDeleteNode?: (nodeId: string) => void;
};
export type SynapNodeData ={
  label: string;
  summary?: string;
  question?: NodeQuestion[];
  links?: string[];
  style?: React.CSSProperties;
}

export type SynapNode = Node<SynapNodeData, 'synapNode'>;

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
