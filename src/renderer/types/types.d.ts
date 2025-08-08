import { Node, Edge, OnConnect, OnEdgesChange, OnNodesChange } from '@xyflow/react';

export interface Research {
  id: string;
  name: string;
  path: string;
  createdAt: string;
}


export interface ResearchData {
  research: {
    nodes: MindMapNode[];
    edges: Edge[];
  }
}

export interface MindMapNode extends Node {
  id: string;
  data: {
    label: string;
    markdownContent?: string;
    aiQuery?: string;
    aiResponse?: string;
    links?: string[];
  };
  position: {
    x: number;
    y: number;
  };
}

export type MindMapNodeEventHandlers = {
  onMarkdownChange?: (nodeId: string, newMarkdown: string) => void;
  onAIQuery?: (nodeId: string, query: string) => Promise<string>;
  onLinkNode?: (sourceNodeId: string, targetNodeId: string) => void;
  onSelectNode?: (nodeId: string) => void;
  onDeleteNode?: (nodeId: string) => void;
};

export type SynapNode = Node;

export type AppState = {
  nodes: SynapNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<SynapNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: SynapNode[]) => void;
  setEdges: (edges: Edge[]) => void;
};
