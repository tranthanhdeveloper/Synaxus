import { Handle, NodeProps, NodeResizer, Position } from '@xyflow/react';
import React, { useState } from 'react';
import { SynapNode } from 'renderer/types/types';
import SynapToolbar from '../SynapToolBar/SynapToolbar';
import { Box, Paper, TextField, Button, Typography, Container } from '@mui/material';

export default function Synap({ data, id, selected }: NodeProps<SynapNode>) {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');
      // TODO: Add logic to get AI response
    }
  };

  return (
    <>
      <div>
        <NodeResizer isVisible={selected} nodeId={id} />
        <Handle type="source" id={'synap-source'} position={Position.Left} isConnectable={true} />
        <Handle type="target" id={'synap-target'} position={Position.Right} isConnectable={true} />
        <SynapToolbar position={Position.Top} />

        {selected && (
          <Container sx={{ bgcolor: 'background.paper' }} >
            <Typography variant="h6">{data.label}</Typography>
            <Box letterSpacing={1}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button variant="contained" onClick={handleSend} sx={{ ml: 1 }}>
                Send
              </Button>
            </Box>
          </Container>
        )}
      </div>
    </>
  );
}
