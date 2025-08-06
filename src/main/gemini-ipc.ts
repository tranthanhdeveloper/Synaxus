import { ipcMain } from 'electron';

ipcMain.handle('getGeminiIdeas', async (_event, topic: string, apiKey: string) => {
  const { GoogleGenAI } = await import('@google/genai');
  const genAI = new GoogleGenAI({ apiKey: apiKey });

  const prompt = `For the research topic "${topic}", generate 3 related ideas. For each idea, provide a title and a brief explanation. the output must be a stringified JSON array of objects, where each object has a "title" and "explanation" property.`;
  try {
    const result = await genAI.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });
    const response = result.text ?? '{}';
    console.log('Gemini Ideas Response:', response);
    return JSON.parse(response);
  } catch (error) {
    console.error('Error calling Gemini API for ideas:', error);
    return [];
  }
});

ipcMain.handle('generateGeminiContent', async (_event, prompt: string, apiKey: string) => {
  const { GoogleGenAI } = await import('@google/genai');
  const genAI = new GoogleGenAI({ apiKey: apiKey });
  try {
    const result = await genAI.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });
    const text = await result.text;
    return text;
  } catch (error) {
    console.error('Error calling Gemini API for content generation:', error);
    return 'Error generating content.';
  }
});