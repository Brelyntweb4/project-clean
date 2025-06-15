const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron');
const path  = require('path');
const fs    = require('fs-extra');

/**
 * Каталог данных Brelynt:
 * 1) если установлена переменная окружения BRELYNT_PATH – используем её;
 * 2) иначе берём жёстко заданный путь (можно поменять под себя).
 */
const DEFAULT_BRELYNT_PATH = 'D:/BrelyntApp/Brelynt';
let BRELYNT_PATH = process.env.BRELYNT_PATH || DEFAULT_BRELYNT_PATH;

/* --------------------------- создание окна --------------------------- */
function createWindow () {
  Menu.setApplicationMenu(null);

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  win.loadFile('public/index.html');
}

/* --------------------------- инициализация --------------------------- */
app.whenReady().then(() => {
  // если переменная окружения не задана — для portable-режима
  if (!process.env.BRELYNT_PATH) {
    // можно, например, хранить данные в userData, но оставим дефолт
    BRELYNT_PATH = DEFAULT_BRELYNT_PATH;
  }
  createWindow();
});

/* ---------------------- обработчик IPC-запроса ----------------------- */
ipcMain.handle('get-brelynt-structure', async () => {
  try {
    if (!fs.existsSync(BRELYNT_PATH)) {
      console.log('[DEBUG] Папка не найдена:', BRELYNT_PATH);
      dialog.showErrorBox('Ошибка', `Папка не найдена: ${BRELYNT_PATH}`);
      return [];
    }

    /** рекурсивное чтение каталога */
    function readDirRecursive(dir) {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      return items.map(item => {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
          return {
            type: 'dir',
            name: item.name,
            children: readDirRecursive(fullPath)
          };
        } else {
          return {
            type: 'file',
            name: item.name,
            path: fullPath
          };
        }
      });
    }

    const structure = readDirRecursive(BRELYNT_PATH);
    console.log('[DEBUG] Структура папки:', JSON.stringify(structure, null, 2));
    return structure;
  } catch (error) {
    console.log('[DEBUG] Ошибка:', error.message);
    dialog.showErrorBox('Ошибка чтения', error.message);
    return [];
  }
});

