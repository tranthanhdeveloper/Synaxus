import React, { use, useCallback } from 'react';
import ReactFlow, { MiniMap, Controls, Background, ControlButton, BackgroundVariant, Panel } from 'reactflow';
import HomeIcon from '@mui/icons-material/Home';
import { Button } from '@mui/material';

interface MindMapCanvasProps {
  nodes: any[];
  edges: any[];
  onNodesChange: any;
  onEdgesChange: any;
  onConnect: any;
  onNodeClick: any;
  children?: React.ReactNode;
  onAddNewNode: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function MindMapCanvas({ nodes, edges, onNodesChange, onEdgesChange, onConnect, onNodeClick, children, onAddNewNode }: MindMapCanvasProps) {

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
      zoomOnScroll={true}
      fitView

    >
      <Panel position='top-left'  >
        <Button variant='contained' color='primary' aria-label='Home' onClick={onHomePageClick}>
          <HomeIcon />
        </Button>
      </Panel>
      <Panel position='top-right'>
        <Button variant="contained" color="secondary" aria-label='Add Node' size='small' onClick={onAddNewNode}>Add Node</Button>
      </Panel>
      <Controls position='bottom-left' />
      <MiniMap />
      <Background variant={BackgroundVariant.Dots} />
      {children}
    </ReactFlow>
  );
}
