import React from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';

interface MindMapCanvasProps {
  nodes: any[];
  edges: any[];
  onNodesChange: any;
  onEdgesChange: any;
  onConnect: any;
  onNodeClick: any;
  children?: React.ReactNode;
}

export default function MindMapCanvas({ nodes, edges, onNodesChange, onEdgesChange, onConnect, onNodeClick, children }: MindMapCanvasProps) {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
    >
      <Controls />
      <MiniMap />
      <Background />
      {children}
    </ReactFlow>
  );
}
