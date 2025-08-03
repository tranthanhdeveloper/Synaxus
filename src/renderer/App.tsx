import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import HomeScreen from './components/Home/HomeScreen';
import { Research } from './types/Research';
import ResearchScreen from './components/Research/ResearchScreen';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import NewResearchDialog from './components/Home/NewResearchDialog';
import { v4 as uuidv4 } from 'uuid';
import { getApiKey, setApiKey, getResearches, setResearches } from './services/StoreService';
import { ReactFlowProvider } from 'reactflow';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const [researches, setResearchesState] = useState<Research[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [apiKey, setApiKeyState] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const storedResearches = await getResearches();
      const storedApiKey = await getApiKey();
      setResearchesState(storedResearches || []);
      setApiKeyState(storedApiKey);
    };
    loadData();
  }, []);

  useEffect(() => {
    setResearches(researches);
  }, [researches]);

  useEffect(() => {
    setApiKey(apiKey);
  }, [apiKey]);

  const handleStartNewResearch = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCreateResearch = (name: string) => {
    let id = uuidv4();
    const newResearch: Research = {
      id: id,
      name,
      path: `./researches/${id}`,
      createdAt: new Date().toISOString(),
    };
    setResearchesState([...researches, newResearch]);
    setDialogOpen(false);
    navigate(`/research/${newResearch.id}`);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <NewResearchDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onCreate={handleCreateResearch}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomeScreen
              researches={researches}
              onStartNewResearch={handleStartNewResearch}
            />
          }
        />
        <Route path="/research/:id" element={<ReactFlowProvider><ResearchScreen apiKey={apiKey} researches={researches} /></ReactFlowProvider>} />
      </Routes>
    </ThemeProvider>
  );
}
