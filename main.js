const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron');
const path = require('path');
const fs = require('fs-extra');
<<<<<<< HEAD

const BRELYNT_PATH = 'D:/BrelyntApp/Brelynt';
=======
let BRELYNT_PATH = process.env.BRELYNT_PATH;
>>>>>>> a567cb9fd600710a89de5fe33d87fef9a9f7bf9b

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

<<<<<<< HEAD
app.whenReady().then(createWindow);

ipcMain.handle('get-brelynt-structure', async () => {
  try {
    if (!fs.existsSync(BRELYNT_PATH)) {
      console.log('[DEBUG] Папка не найдена:', BRELYNT_PATH);
      dialog.showErrorBox('Ошибка', `Папка не найдена: ${BRELYNT_PATH}`);
      return [];
    }
=======
app.whenReady().then(() => {
  if (!BRELYNT_PATH) {
    BRELYNT_PATH = path.join(app.getPath('userData'), 'Brelynt');
  }
  createWindow();
});

ipcMain.handle('get-brelynt-structure', async () => {
  try {
>>>>>>> a567cb9fd600710a89de5fe33d87fef9a9f7bf9b
    function readDirRecursive(dir) {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      return items.map(item => {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
          return {
            type: 'dir',
            name: item.name,
            children: readDirRecursive(fullPath)
<<<<<<< HEAD
          }
=======
          };
>>>>>>> a567cb9fd600710a89de5fe33d87fef9a9f7bf9b
        } else {
          return {
            type: 'file',
            name: item.name,
            path: fullPath
<<<<<<< HEAD
          }
        }
      });
    }
=======
          };
        }
      });
    }

>>>>>>> a567cb9fd600710a89de5fe33d87fef9a9f7bf9b
    const structure = readDirRecursive(BRELYNT_PATH);
    console.log('[DEBUG] Структура папки:', JSON.stringify(structure, null, 2));
    return structure;
  } catch (error) {
    console.log('[DEBUG] Ошибка:', error.message);
    dialog.showErrorBox('Ошибка чтения', error.message);
    return [];
  }
});
