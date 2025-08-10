import { useCallback } from 'react';
import { getResearchMapData, setResearchMapData } from '../services/StoreService';
import { ResearchData } from '../types/types';

export function useMindMapData() {
  const loadMindMap = useCallback(async (id: string) => {
    return await getResearchMapData(id);
  }, []);

  const saveMindMap = useCallback(async (id: string, data: ResearchData) => {
    await setResearchMapData(id, data);
  }, []);

  return { loadMindMap, saveMindMap };
}
