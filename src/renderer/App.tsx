import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomeScreen from './components/Home/HomeScreen';
import ResearchScreen from './components/Research/ResearchScreen';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactFlowProvider } from 'reactflow';
import { useEffect } from 'react';
import SettingsDialog from './components/Setting/SettingsDialog';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={ <HomeScreen /> }  />
        <Route path="/research/:id" element={<ReactFlowProvider><ResearchScreen /></ReactFlowProvider>} />
      </Routes>
    </ThemeProvider>
  );
}
