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
    return mindMapStore.get(researchId, null);
  })();
});

ipcMain.handle('setMindMapData', (_event, researchId: string, data: any) => {
  (async () => {
    await initMindMapStore();
    mindMapStore.set(researchId, data);
  })();
});
