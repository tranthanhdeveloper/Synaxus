import { app, ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';

ipcMain.handle('createResearchFolder', async (event, folderName) => {
  const researchRoot = path.join(app.getPath('userData'), 'researches');
  const newFolderPath = path.join(researchRoot, folderName);

  if (!fs.existsSync(researchRoot)) {
    fs.mkdirSync(researchRoot);
  }
  if (!fs.existsSync(newFolderPath)) {
    fs.mkdirSync(newFolderPath);
  }
  return newFolderPath;
});