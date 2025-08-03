import { Button, TextField, CircularProgress } from '@mui/material';
import React from 'react';

interface AIQueryBoxProps {
  queryText: string;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  disabled: boolean;
}

export default function AIQueryBox({ queryText, loading, onChange, onSubmit, disabled }: AIQueryBoxProps) {
  return (
    <>
      <TextField
        label="Query Gemini AI"
        variant="outlined"
        fullWidth
        value={queryText}
        onChange={onChange}
        sx={{ mb: 1 }}
      />
      <Button variant="contained" onClick={onSubmit} disabled={disabled}>
        {loading ? <CircularProgress size={24} /> : 'Submit Query'}
      </Button>
    </>
  );
}
