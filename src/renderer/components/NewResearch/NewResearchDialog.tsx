import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Research } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';
import { getResearches, setResearches } from '../../services/StoreService';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NewResearchDialog({ open, onClose }: Props) {

  const [researches, setResearchesState] = useState<Research[]>([]);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const storedResearches = await getResearches();
      setResearchesState(storedResearches || []);
    };
    loadData();
  }, []);


  useEffect(() => {
    setResearches(researches);
  }, [researches]);

  const handleCreateResearch = async (name: string) => {
    let id = uuidv4();
    const newResearch: Research = {
      id: id,
      name,
      path: `./researches/${id}`,
      createdAt: new Date().toISOString(),
    };
    setResearchesState([...researches, newResearch]);
    navigate(`/research/${newResearch.id}`);
  };

  const handleCreate = () => {
    handleCreateResearch(name);
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
