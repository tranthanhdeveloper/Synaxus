import { NodeProps, NodeToolbar, Position } from '@xyflow/react';
import React from 'react';
import {  SynapNode } from 'renderer/types/types';
import SynapToolbar from '../SynapToolBar/SynapToolbar';


export default  function Synap({data}: NodeProps<SynapNode>) {
  console.log('Synap node props', data);
  return (
    <div>
      <SynapToolbar isVisible={true} position={Position.Top} />
      <div style={data.style}>{data.label}</div>
    </div>
  );
}
