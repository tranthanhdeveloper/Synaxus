import { GoogleGenerativeAI } from '@google/generative-ai';

export interface GeminiIdea {
  title: string;
  explanation: string;
}

export async function getGeminiIdeas(topic: string): Promise<GeminiIdea[]> {
  // Get API key from user settings via IPC
  const apiKey = await window.electron.ipcRenderer.invoke('getApiKey');
  return await window.electron.ipcRenderer.invoke('getGeminiIdeas', topic, apiKey);
}

export async function generateGeminiContent(prompt: string): Promise<string> {
  // Get API key from user settings via IPC
  const apiKey = await window.electron.ipcRenderer.invoke('getApiKey');
  return await window.electron.ipcRenderer.invoke('generateGeminiContent', prompt, apiKey);
}
