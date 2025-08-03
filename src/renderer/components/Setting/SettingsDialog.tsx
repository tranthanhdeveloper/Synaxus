import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useState, useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
  initialApiKey: string;
}

export default function SettingsDialog({ open, onClose, onSave, initialApiKey }: Props) {
  const [apiKey, setApiKey] = useState(initialApiKey);

  useEffect(() => {
    setApiKey(initialApiKey);
  }, [initialApiKey, open]);

  const handleSave = async () => {
    // Save API key to main process via IPC
    if (window.electron?.ipcRenderer?.invoke) {
      await window.electron.ipcRenderer.invoke('setApiKey', apiKey);
    }
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
