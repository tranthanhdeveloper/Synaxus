import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
  initialApiKey: string;
}

export default function SettingsDialog({ open, onClose, onSave, initialApiKey }: Props) {
  const [apiKey, setApiKey] = useState(initialApiKey);

  const handleSave = () => {
    onSave(apiKey);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your Gemini API key. This is stored locally and never shared.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="apiKey"
          label="Gemini API Key"
          type="password"
          fullWidth
          variant="standard"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
