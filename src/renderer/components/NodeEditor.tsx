import MDEditor from '@uiw/react-md-editor';
import { Box } from '@mui/material';
import React from 'react';

interface NodeEditorProps {
  value: string;
  onChange: (value?: string) => void;
}

export default function NodeEditor({ value, onChange }: NodeEditorProps) {
  return (
    <Box data-color-mode="dark" style={{ marginTop: '16px', marginBottom: '16px' }}>
      <MDEditor value={value} onChange={onChange} height={200} />
    </Box>
  );
}
