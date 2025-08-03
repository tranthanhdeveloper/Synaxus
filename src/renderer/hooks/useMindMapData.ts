import { useCallback } from 'react';
import { getMindMapData, setMindMapData } from '../StoreService';

export function useMindMapData() {
  const loadMindMap = useCallback(async (id: string) => {
    return await getMindMapData(id);
  }, []);

  const saveMindMap = useCallback(async (id: string, data: any) => {
    await setMindMapData(id, data);
  }, []);

  return { loadMindMap, saveMindMap };
}
