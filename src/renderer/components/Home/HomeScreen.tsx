import { Link } from 'react-router-dom';
import { Button, Container, Typography, List, ListItem, ListItemText, Card, CardContent, CardActions } from '@mui/material';
import NewResearchDialog from '../NewResearch/NewResearchDialog';
import { useState } from 'react';
import ResearchList from '../ResearchList/ResearchList';

interface Props {
}

export default function HomeScreen({ }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);


  const handleStartNewResearch = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Container maxWidth="md">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Synaxus
          </Typography>
        </div>
        <Button variant="contained" color="primary" onClick={handleStartNewResearch} sx={{ mb: 4 }}>
          Start New Research
        </Button>
        <ResearchList/>
      </Container>

      <NewResearchDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  );
}
