# Electron

Electron trabaja con :

main.js => Node js

HTML => Chromium Renderer Process (client - side)

Main process: main.js

Cuando creamos una aplicacion en electron debemos esperar a que el modulo app de electron este ready antes de realizar un proceso de renderer.

createWindow: crea procesos de renderizado o instancias de ventanas del browser

Importante al crear new BrowserWindow
cada instancia de BrowserWindow se crea dentro de una variable global en el scope de nuestro archivo archivo main.js

Por que : main.js corre como un proceso de nodejs esto hace que tenga una referencia con nuestro arhivo main u con otro proceso de renderer.Esto preeve desde el inicio lo que se llamaria el garbage collected (basura recolectada)

```electron

let mainWindow;

function createWindow(){
mainWindow = new BrowserWindow({
    propiedades que se le asignaran a esa instancia de ventana

    webPreferences:{nodeIntegration:true} // le indicamos que se integre nodejs dentro de nuestro proceso rederer
})
}

```

Carga de archivos en el browserWindow : Cargamos un archivo html en nuestro browserWindow creado.

```Electron
loadFile('main.html')


```
