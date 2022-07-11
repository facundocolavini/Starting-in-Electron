const { app, BrowserWindow, Tray, Menu } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile('index.html');
  //Tray bar y Tooltip
  tray = new Tray('videogame.png');
  tray.setToolTip('Sielcon');
  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show();
  });

  //Template con las opciones que tendra a la hora de hacer click derecho
  let optionsMenu = [{ label: 'Menu', type: 'radio' }, { label: 'Exit' }];
  let contextMenu = Menu.buildFromTemplate(optionsMenu);
  tray.setContextMenu(contextMenu);
};

app.whenReady().then(() => {
  createWindow();
});
