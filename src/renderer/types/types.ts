export interface Research {
  id: string;
  name: string;
  path: string;
  createdAt: string;
}

export interface MindMapNode {
  id: string;
  data: {
    label: string;
    markdownContent?: string;
    aiQuery?: string;
    aiResponse?: string;
    links?: string[]; // array of node ids this node links to
  };
  position: {
    x: number;
    y: number;
  };
}

// Event handler types for custom MindMapNode
export type MindMapNodeEventHandlers = {
  onMarkdownChange?: (nodeId: string, newMarkdown: string) => void;
  onAIQuery?: (nodeId: string, query: string) => Promise<string>;
  onLinkNode?: (sourceNodeId: string, targetNodeId: string) => void;
  onSelectNode?: (nodeId: string) => void;
  onDeleteNode?: (nodeId: string) => void;
};
