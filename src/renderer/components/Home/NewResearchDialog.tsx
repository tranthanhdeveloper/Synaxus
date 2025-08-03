import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

export default function NewResearchDialog({ open, onClose, onCreate }: Props) {
  const [name, setName] = useState('');

  const handleCreate = () => {
    onCreate(name);
    setName('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Start New Research</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter a name for your new research project.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Research Name"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
