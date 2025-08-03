import React, { use, useCallback } from 'react';
import ReactFlow, { MiniMap, Controls, Background, ControlButton } from 'reactflow';
import HomeIcon from '@mui/icons-material/Home';

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

  const onHomePageClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    window.location.href = '/';
  }, []);
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
    >
      <Controls position='top-left' showZoom={false} showInteractive={false} showFitView={false} >
        <ControlButton onClick={onHomePageClick}>
          <HomeIcon />
        </ControlButton>
      </Controls>
      <Controls position='bottom-left' />
      <MiniMap />
      <Background />
      {children}
    </ReactFlow>
  );
}
