import { Button, Container, Typography} from '@mui/material';
import NewResearchDialog from '../NewResearch/NewResearchDialog';
import { useState } from 'react';
import StudyList from '../ResearchList/StudyList';

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
          New Study
        </Button>
        <StudyList/>
      </Container>

      <NewResearchDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  );
}
