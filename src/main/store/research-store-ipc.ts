import { ipcMain } from 'electron';
let researchStore: any;
let Store: any;

async function initResearchStore() {
  if (!Store) {
    Store = (await import('electron-store')).default;
  }
  if (!researchStore) {
    researchStore = new Store({ name: 'research' });
  }
}

ipcMain.handle('getResearches', () => {
  return (async () => {
    await initResearchStore();
    return researchStore.get('researches', []);
  })();
});

ipcMain.handle('setResearches', (_event, researches: any[]) => {
  (async () => {
    await initResearchStore();
    researchStore.set('researches', researches);
  })();
});
