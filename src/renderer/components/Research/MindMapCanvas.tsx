import React, { useCallback } from 'react';
import { ReactFlow, MiniMap, Controls, Background, BackgroundVariant, Panel } from '@xyflow/react';
import HomeIcon from '@mui/icons-material/Home';
import { Button, Popover } from '@mui/material';
import Synap from './Synap/Synap';
import AddNewSynap from './AddNewSynap/AddNewSynap';

interface MindMapCanvasProps {
  nodes: any[];
  edges: any[];
  onNodesChange: any;
  onEdgesChange: any;
  onConnect?: any;
  onNodeClick?: any;
  children?: React.ReactNode;
  onAddNewNode: (label: string) => void;
}

export default function MindMapCanvas({ nodes, edges, onNodesChange, onEdgesChange, onConnect, onNodeClick, children, onAddNewNode }: MindMapCanvasProps) {
  const synap = { default: Synap };
  const onHomePageClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    window.location.href = '/';
  }, []);
  return (
    <ReactFlow
      nodeTypes={synap}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      zoomOnScroll={true}
      fitView={true}
    >
      <Panel position='top-left'  >
        <Button variant='contained' color='primary' aria-label='Home' onClick={onHomePageClick}>
          <HomeIcon />
        </Button>
      </Panel>
      <Panel position='top-right'>
        <AddNewSynap onAddNewNode={onAddNewNode} />
      </Panel>
      <Controls position='bottom-left' />
      <MiniMap />
      <Background variant={BackgroundVariant.Dots} />
      {children}
    </ReactFlow>
  );
}
