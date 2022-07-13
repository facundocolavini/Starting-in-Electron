'use strict';

const {
  createJsonLog,
  createFolderLog,
  deleteJsonLog,
} = require('./storeLogs');

const {
  app,
  nativeImage,
  Tray,
  Menu,
  BrowserWindow,
  shell,
} = require('electron');
const os = require('os');
const path = require('path');
const fs = require('fs');

let top = {}; // prevent gc to keep windows
let submenuSession = [
  {
    label: 'Iniciar Sesión',
    click: (item, window, event) => {
      console.log(item, event);
      top.win.loadFile(path.join(__dirname, 'logIn.html'));
      top.win.show();
    },
  },
  {
    label: 'Cerrar Sesión',
    click: (item, window, event) => {
      //console.log(item, event,'ACA HAY UN LOG');
      top.win.loadFile(path.join(__dirname, 'logOut.html'));
    },
  },
];

let templateOptionMenu = [
  {
    label: 'Sesión',
    submenu: submenuSession,
  },
  { type: 'separator' },
  {
    label: 'Logs',
    submenu: [
      {
        label: 'Mi Log',
        click: async (item, window, event) => {
          console.log(item, event);

          createFolderLog(path.join(__dirname, 'log'));
          createJsonLog(path.join(__dirname + '/log', 'log.json'), {
            name: 'facundo',
            password: '1234',
          });
        },
      },
      {
        label: 'Eliminar Log',
        click: (item, window, event) => {
          //console.log(item, event);
          deleteJsonLog(path.join(__dirname, 'log'));
          /*    shell.openPath(path.join(__dirname, '/log')); // Eliminar archivo con logs ver de hacer con fs */
        },
      },
    ],
  },
  { type: 'separator' },
  { role: 'quit' }, // "role": system prepared action menu
];

app.on('ready', (ev) => {
  top.win = new BrowserWindow({
    width: 300,
    height: 600,
    icon: 'icon.ico',
    skipTaskbar: true,
    modal: false,
    resizable: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      webSecurity: true,
      sandbox: true,
    },
  });
  //Posicion de las ventanas
  console.log(app);
  top.win.setPosition(0, 290);
  top.win.on('close', (ev) => {
    console.log(ev);
    ev.sender.hide();
    ev.preventDefault(); // prevent quit process
  });

  // empty image as transparent icon: it can click
  // see: https://electron.atom.io/docs/api/tray/
  top.tray = new Tray('videogame.png');
  const menu = Menu.buildFromTemplate(templateOptionMenu);
  top.tray.setToolTip(`Hello ${os.hostname}`);
  //top.tray.setTitle("Tray Example"); // macOS only
  top.tray.setContextMenu(menu);
});

app.on('before-quit', (ev) => {
  // BrowserWindow "close" event spawn after quit operation,
  // it requires to clean up listeners for "close" event
  top.win.removeAllListeners('close');
  // release windows
  top = null;
});
