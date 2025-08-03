import { Link } from 'react-router-dom';
import { Research } from './Research';
import { Button, Container, Typography, List, ListItem, ListItemText, Card, CardContent, CardActions, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

interface Props {
  researches: Research[];
  onStartNewResearch: () => void;
  onOpenSettings: () => void;
}

export default function HomeScreen({ researches, onStartNewResearch, onOpenSettings }: Props) {
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
