import { ipcMain } from 'electron';
let settingsStore: any;
let Store: any;

async function initSettingsStore() {
  if (!Store) {
    Store = (await import('electron-store')).default;
  }
  if (!settingsStore) {
    settingsStore = new Store({ name: 'user-settings' });
  }
}

ipcMain.handle('getApiKey', () => {
  return (async () => {
    await initSettingsStore();
    return settingsStore.get('apiKey', '');
  })();
});

ipcMain.handle('setApiKey', (_event, key: string) => {
  (async () => {
    await initSettingsStore();
    settingsStore.set('apiKey', key);
  })();
});
