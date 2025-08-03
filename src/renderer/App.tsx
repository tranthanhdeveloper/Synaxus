import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import HomeScreen from './HomeScreen';
import { Research } from './Research';
import ResearchScreen from './ResearchScreen';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import NewResearchDialog from './NewResearchDialog';
import { v4 as uuidv4 } from 'uuid';
import SettingsDialog from './SettingsDialog';
import { getApiKey, setApiKey, getResearches, setResearches } from './StoreService';
import { ReactFlowProvider } from 'reactflow';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const [researches, setResearchesState] = useState<Research[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
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

  useEffect(() => {
    window.electron.ipcRenderer.on('open-settings-dialog', () => {
      setSettingsOpen(true);
    });

    return () => {
      window.electron.ipcRenderer.removeAllListeners('open-settings-dialog');
    };
  }, []);

  const handleStartNewResearch = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCreateResearch = (name: string) => {
    const newResearch: Research = {
      id: uuidv4(),
      name,
      path: `/Users/thanhtran/devs/Synaxus/researches/${name.replace(/\s+/g, '-').toLowerCase()}`,
      createdAt: new Date().toISOString(),
    };
    setResearchesState([...researches, newResearch]);
    setDialogOpen(false);
    navigate(`/research/${newResearch.id}`);
  };

  const handleOpenSettings = () => {
    setSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setSettingsOpen(false);
  };

  const handleSaveSettings = (newApiKey: string) => {
    setApiKeyState(newApiKey);
    setSettingsOpen(false);
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
              onOpenSettings={handleOpenSettings}
            />
          }
        />
        <Route path="/research/:id" element={<ReactFlowProvider><ResearchScreen apiKey={apiKey} researches={researches} /></ReactFlowProvider>} />
      </Routes>
    </ThemeProvider>
  );
}
