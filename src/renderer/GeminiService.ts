import { GoogleGenerativeAI } from '@google/generative-ai';

export interface GeminiIdea {
  title: string;
  explanation: string;
}

export async function getGeminiIdeas(
  topic: string,
  apiKey: string,
): Promise<GeminiIdea[]> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `For the research topic "${topic}", generate 3 related ideas. For each idea, provide a title and a brief explanation. Format the output as a JSON array of objects, where each object has a "title" and "explanation" property.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return JSON.parse(text) as GeminiIdea[];
  } catch (error) {
    console.error('Error calling Gemini API for ideas:', error);
    return [];
  }
}

export async function generateGeminiContent(
  prompt: string,
  apiKey: string,
): Promise<string> {
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
}
