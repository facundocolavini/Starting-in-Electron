
"use strict";

// [run the app]
// $ npm install electron
// $ ./node_modules/.bin/electron .

const {app, nativeImage, Tray, Menu, BrowserWindow,shell} = require("electron");
const os = require("os");
const path = require("path");


let top = {}; // prevent gc to keep windows
let templateOptionMenu = [
  {label: "Sesión", submenu: [
      {label: "Iniciar Sesión", click: (item, window, event) => {
        console.log(item, event);
        top.win.loadFile(path.join(__dirname, 'logIn.html'));
        top.win.show();  
      }},
      {label: "Cerrar Sesión", click: (item, window, event) => {
        console.log(item, event,'ACA HAY UN LOG');
        top.win.loadFile(path.join(__dirname, 'logOut.html'));
      }},
  ]},
  {type: "separator"},
  {label: "Logs", submenu:[
    {label: "Mi Log", click: (item, window, event) => {
      console.log(item, event);
      shell.openPath( path.join(__dirname, '/log')) // Carpeta con logs
    }},
    {label: "Eliminar Log", click: (item, window, event) => {
      console.log(item, event);
      shell.openPath(path.join(__dirname, '/log')) // Eliminar archivo con logs ver de hacer con fs 
      
    }},
  ]},
  {type: "separator"},
  {role: "quit"}, // "role": system prepared action menu
]

app.once("ready", ev => {
    top.win = new BrowserWindow({
        width: 800, height: 600, center: true, minimizable: false, show: false,
        webPreferences: {
            nodeIntegration: false,
            webSecurity: true,
            sandbox: true,
        },                                
    });

    top.win.on("close", ev => {
        console.log(ev);
        ev.sender.hide();
        ev.preventDefault(); // prevent quit process
    });

    // empty image as transparent icon: it can click
    // see: https://electron.atom.io/docs/api/tray/
    top.tray = new Tray("videogame.png");
    const menu = Menu.buildFromTemplate(templateOptionMenu);
    top.tray.setToolTip(`Hello ${os.hostname}`);
    //top.tray.setTitle("Tray Example"); // macOS only
    top.tray.setContextMenu(menu);

    // Option: some animated web site to tray icon image
    // see: https://electron.atom.io/docs/tutorial/offscreen-rendering/
    top.icons = new BrowserWindow({
        show: false, webPreferences: {offscreen: true}});
    top.icons.loadURL("videogame.png");
    top.icons.webContents.on("paint", (event, dirty, image) => {
        if (top.tray) top.tray.setImage(image.resize({width: 16, height: 16}));
    });
});
app.on("before-quit", ev => {
    // BrowserWindow "close" event spawn after quit operation,
    // it requires to clean up listeners for "close" event
    top.win.removeAllListeners("close");
    // release windows
    top = null;
});