import { Edge, Node } from "@xyflow/react";


export type SynapNodeData = {
  label: string;
  summary?: string;
  question?: NodeQuestion[];
  links?: string[];
  style?: React.CSSProperties;
}

export type SynapNode = Node<SynapNodeData, 'synapNode'>;

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