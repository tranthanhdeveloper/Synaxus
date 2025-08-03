import { ipcMain } from 'electron';
import { GoogleGenerativeAI } from '@google/generative-ai';

ipcMain.handle('getGeminiIdeas', async (_event, topic: string, apiKey: string) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = `For the research topic "${topic}", generate 3 related ideas. For each idea, provide a title and a brief explanation. the output must be a stringified JSON array of objects, where each object has a "title" and "explanation" property.`;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    console.log('Gemini Ideas Response:', text);
    return JSON.parse(text);
  } catch (error) {
    console.error('Error calling Gemini API for ideas:', error);
    return [];
  }
});

ipcMain.handle('generateGeminiContent', async (_event, prompt: string, apiKey: string) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    console.error('Error calling Gemini API for content generation:', error);
    return 'Error generating content.';
  }
});