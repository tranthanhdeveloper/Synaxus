import { Link } from 'react-router-dom';
import { Research } from '../../types/types';
import { Button, Typography, List, ListItem, ListItemText, Card, CardContent, CardActions, Container } from '@mui/material';
import { getResearches } from '../../services/StoreService';
import { use, useEffect, useState } from 'react';

export default function ResearchList() {
    const [researches, setResearches] = useState<Research[]>([]);


    useEffect(() => {
        const fetchResearches = async () => {
            const storedResearches = await getResearches();
            setResearches(storedResearches || []);
        };
        fetchResearches();
    }, []);

    return (
        <>
            <Typography variant="h4" component="h2" gutterBottom>
                Recent Researches
            </Typography>
            <List>
                {researches.map((research) => (
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
        </>
    );
}
