import { Research, ResearchData } from '../types/types';

export async function getResearchMapData(researchId: string): Promise<ResearchData> {
  return await window.electron.ipcRenderer.invoke('getMindMapData', researchId);
}

export async function setResearchMapData(researchPath: string, data: ResearchData): Promise<void> {
  await window.electron.ipcRenderer.invoke('setMindMapData', researchPath, data);
}

export async function createResearchFolder(name: string): Promise<string> {
  return await window.electron.ipcRenderer.invoke('createResearchFolder', name);
}

export async function getApiKey(): Promise<string> {
  return await window.electron.ipcRenderer.invoke('getApiKey');
}

export async function setApiKey(apiKey: string): Promise<void> {
  await window.electron.ipcRenderer.invoke('setApiKey', apiKey);
}

export async function getResearches(): Promise<Research[]> {
  return await window.electron.ipcRenderer.invoke('getResearches');
}

export async function getResearchById(id: string): Promise<Research> {
  let researches = await window.electron.ipcRenderer.invoke('getResearches');
  researches = researches.filter((research: Research) => research.id === id);
  return researches[0];
}

export async function setResearches(researches: Research[]): Promise<void> {
  await window.electron.ipcRenderer.invoke('setResearches', researches);
}
