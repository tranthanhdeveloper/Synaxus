import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomeScreen from './components/Home/HomeScreen';
import ResearchScreen from './components/Research/ResearchWorkspace';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactFlowProvider } from '@xyflow/react'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  spacing: 1,
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={ <HomeScreen /> }  />
        <Route path="/research/:researchId" element={<ReactFlowProvider><ResearchScreen /></ReactFlowProvider>} />
      </Routes>
    </ThemeProvider>
  );
}
