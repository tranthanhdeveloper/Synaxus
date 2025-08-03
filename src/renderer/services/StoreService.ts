import { Research } from '../types/types';

export async function getMindMapData(researchId: string): Promise<any> {
  return await window.electron.ipcRenderer.invoke('getMindMapData', researchId);
}

export async function setMindMapData(researchId: string, data: any): Promise<void> {
  await window.electron.ipcRenderer.invoke('setMindMapData', researchId, data);
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
