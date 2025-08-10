import { app, ipcMain } from 'electron';
import fs from 'node:fs';
import path from 'node:path';
import { ResearchData } from 'renderer/types/types';

ipcMain.handle('getMindMapData', async (_event, researchPath: string) => {
  let fileContent = fs.readFileSync(path.join(researchPath, 'researchdata.json'), 'utf-8');
  return JSON.parse(fileContent) as ResearchData;
});

ipcMain.handle('setMindMapData', async (_event, researchPath: string, data: ResearchData) => {
  const storingPath = path.join(researchPath, 'researchdata.json');
  fs.writeFileSync(storingPath, JSON.stringify(data), 'utf-8');
});

