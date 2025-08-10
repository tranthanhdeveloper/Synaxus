import { useCallback } from 'react';
import { getResearchById, setResearchMapData, getResearchMapData } from '../../services/StoreService';
import { Research, ResearchData } from '../../types/types';

export function useResearch(researchId: string) {
  const loadResearch = useCallback(async () => {
    return await getResearchById(researchId);
  }, []);

  const saveResearch = useCallback(async (data: ResearchData) => {
    await setResearchMapData(researchId, data);
  }, []);

  const loadResearchData = useCallback(async () => {
    return await getResearchMapData(researchId);
  }, []);

  const setResearchData = useCallback(async (data: ResearchData) => {
    await setResearchMapData(researchId, data);
  }, []);

  return { loadResearch, loadResearchData, saveResearch, setResearchData };
}
