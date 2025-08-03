import { Link } from 'react-router-dom';
import { Research } from '../../types/Research';
import { Button, Container, Typography, List, ListItem, ListItemText, Card, CardContent, CardActions } from '@mui/material';

interface Props {
  researches: Research[];
  onStartNewResearch: () => void;
}

export default function HomeScreen({ researches, onStartNewResearch }: Props) {
  const safeResearches = Array.isArray(researches) ? researches : [];
  return (
    <Container maxWidth="md">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Synaxus
        </Typography>
      </div>
      <Button variant="contained" color="primary" onClick={onStartNewResearch} sx={{ mb: 4 }}>
        Start New Research
      </Button>
      <Typography variant="h4" component="h2" gutterBottom>
        Recent Researches
      </Typography>
      <List>
        {safeResearches.map((research) => (
          <ListItem key={research.id} disablePadding>
            <Card sx={{ width: '100%', mb: 2 }}>
              <CardContent>
                <ListItemText
                  primary={research.name}
                  secondary={`Created at: ${new Date(research.createdAt).toLocaleString()}`}
                />
              </CardContent>
              <CardActions>
                <Button component={Link} to={`/research/${research.id}`} size="small">View</Button>
              </CardActions>
            </Card>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
