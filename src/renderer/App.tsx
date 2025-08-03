import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import HomeScreen from './components/Home/HomeScreen';
import ResearchScreen from './components/Research/ResearchScreen';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import { getApiKey, setApiKey } from './services/StoreService';
import { ReactFlowProvider } from 'reactflow';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const [apiKey, setApiKeyState] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const storedApiKey = await getApiKey();
      setApiKeyState(storedApiKey);
    };
    loadData();
  }, []);



  useEffect(() => {
    setApiKey(apiKey);
  }, [apiKey]);


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={ <HomeScreen /> }  />
        <Route path="/research/:id" element={<ReactFlowProvider><ResearchScreen apiKey={apiKey} researches={[]} /></ReactFlowProvider>} />
      </Routes>
    </ThemeProvider>
  );
}
