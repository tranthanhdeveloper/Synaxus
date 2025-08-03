import React, { createContext, useContext, useState, useEffect } from 'react';
import { getApiKey, setApiKey, getResearches, setResearches } from '../StoreService';
import { Research } from '../Research';

interface AppContextType {
  researches: Research[];
  setResearches: (researches: Research[]) => void;
  apiKey: string;
  setApiKey: (apiKey: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [researches, setResearchesState] = useState<Research[]>([]);
  const [apiKey, setApiKeyState] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setResearchesState(await getResearches());
      setApiKeyState(await getApiKey());
    };
    loadData();
  }, []);

  useEffect(() => {
    setResearches(researches);
  }, [researches]);

  useEffect(() => {
    setApiKey(apiKey);
  }, [apiKey]);

  return (
    <AppContext.Provider value={{ researches, setResearches: setResearchesState, apiKey, setApiKey: setApiKeyState }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
