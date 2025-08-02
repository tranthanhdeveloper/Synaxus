
import { ipcMain } from 'electron';
let Store: any;
let store: any;

ipcMain.handle('getMindMapData', (_event, researchId: string) => {
  return (async () => {
    await initStore();
    return store.get(`mindMapData-${researchId}`, null);
  })();
});

ipcMain.handle('setMindMapData', (_event, researchId: string, data: any) => {
  (async () => {
    await initStore();
    store.set(`mindMapData-${researchId}`, data);
  })();
});

async function initStore() {
  if (!Store) {
    Store = (await import('electron-store')).default;
    store = new Store();
  }
}

ipcMain.handle('getApiKey', () => {
  return (async () => {
    await initStore();
    return store.get('apiKey', '');
  })();
});

ipcMain.handle('setApiKey', (_event, apiKey: string) => {
  (async () => {
    await initStore();
    store.set('apiKey', apiKey);
  })();
});

ipcMain.handle('getResearches', () => {
  return (async () => {
    await initStore();
    return store.get('researches', []);
  })();
});

ipcMain.handle('setResearches', (_event, researches: any[]) => {
  (async () => {
    await initStore();
    store.set('researches', researches);
  })();
});
