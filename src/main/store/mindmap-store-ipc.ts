import { ipcMain } from 'electron';
let mindMapStore: any;
let Store: any;

async function initMindMapStore() {
  if (!Store) {
    Store = (await import('electron-store')).default;
  }
  if (!mindMapStore) {
    mindMapStore = new Store({ name: 'mindmap' });
  }
}

ipcMain.handle('getMindMapData', (_event, researchId: string) => {
  return (async () => {
    await initMindMapStore();
    console.log('Fetching mind map data for research ID:', researchId);
    return mindMapStore.get(researchId, null);
  })();
});

ipcMain.handle('setMindMapData', async (_event, researchId: string, data: any) => {
  await initMindMapStore();
  console.log('Setting mind map data for research ID:', researchId, 'Data:', data);
  mindMapStore.set(researchId, data);
});

