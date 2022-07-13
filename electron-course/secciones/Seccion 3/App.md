# App

Las APIs de Electron constituye de las siguientes :

## Electron Apis:

1. Main Process (Node.js)
2. Renderer Process (Chromium)
3. Shared Modules

## Diferencias entre estas 3 Apis

Ninguna anda dentro de otra api
main process no funciopna en el process renderer y vice versa.
Pero al aplicar Shared Modules en ambos process podemos hacer que funcionen en ambos.

## Api Docs

En la documentacion de elctron tenemos cada modulo de electron con su proceso designado

https://www.electronjs.org/es/docs/latest/api/app

# Modules

## App

Es el unico modulo que no se crea a travez de una instancia como un modulo en el orden de uso .
Controla el ciclo de vida de los eventos de la aplicacion.

Ej: quit, relauching etc.

El objeto app emite los siguientes eventos:

## Eventos de app event Lyfecycle

## Evento Evento: 'will-finish-launching'

Emitido cuando la aplicación ha terminado su iniciación básica. En windows y Linux el evento will-finish-launching es el mismo que el evento ready; en macOS este evento representa la notificación applicationWillFinishLaunching de NSApplication. Normalmente configurará aquí los receptores para los eventos open-file y open-url, e iniciará el informador de errores y el actualizador automático.

En la mayoría de los casos usted debe hacer todo desde el controlador del evento ready.

## Evento Ready

Apenas instanciamos app este evento se crea y esta listo para nosotros para utilizarlo en el momento.

Lo primero que va a ejecutar nuestra app es lo que viene adentro de nuestro evento ready

```electron

console.log('Chekcking ready: ' + app.isReady()); //false
app.on('ready',()=>{
    console.log('App lista');
    createWindow
}) // App lista

```

Si ejecutamos app.isReady antes de que el evento ready se dispare chequeara que esta false y por lo tanto no esta lista.Si le damos unos segundos o un timer con un setTimeOut ahi nos dara que ya se disparo el evento.//TRUE
Esto es muy util cuando utilizamos modulos externos por fuera del main script.

## Evento 'before-quit'

Emitido antes de que la aplicación empiece a cerrar sus ventanas. Llamando a event.preventDefault() evitará el comportamiento por defecto, que es terminar la aplicación.

Note: Si el cierre de la aplicación fue iniciada por autoUpdater.quitAndInstall(), luego before-quit es emitido after emitiendo el evento close en todas las ventanas y cerrándolas.

Nota: En Windows, este evento no será emitido si la aplicación se cierra debido a un apagado/reinicio del sistema o el cierre de sesión de un usuario.

```Electron
app.on('before-quit', (e) => {

  console.log('App se esta cerrando');
      e.preventDefault(); // metodo para prevenir el flujo de eventos
});
```

## open-file

Solo para macOS
Devuelve:

event
path string
Emitido cuando el usuario quiere abrir un archivo con la aplicación. El evento open-file es emitido usualmente cuando la aplicación está ya abierta y el sistema operativo quiere reusar la aplicación para abrir el archivo. open-file también es emitido cuando el archivo es soltado dentro del dock y la aplicación todavía no se está ejecutando. Asegúrese de escuchar sobre el evento open-file muy temprano en el el inicio de su aplicación para manejar este caso (incluso antes de que el evento ready sea emitido).

Usted debe llamar a event.preventDefault() si quiere manejar este evento.

En Windows, tiene que analizar process.argv (en el proceso principal) para encontrar la ruta del archivo.

# Evento: 'browser-window-blur'

Devuelve:

event
window BrowserWindow
Emitido cuando el browserWindow está borroso.

# Evento: 'browser-window-focus'

Devuelve:

event
window BrowserWindow
Emitido cuando se enfoca un browserWindow.

# Métodos

El objeto app tiene los siguientes métodos:

Note: Algunos métodos solo están disponibles en sistemas operativos específicos y son etiquetados como tal.

## app.quit()

Intenta cerrar todas las ventanas. El evento before-quit se producirá primero. Si todas las ventas son cerradas exitosamente, el evento will-quit será producido y por defecto la aplicación se cerrará.

Este método garantiza que todos los eventos de beforeunload y unload serán correctamente ejecutados. Es posible que una ventana cancele la salida regresando falso en el manipulador de eventos antes de cargar.

## app.exit([exitCode])

exitCode es un number (opcional)
Sale inmediatamente con exitCode. exitCode por defecto 0.

Todas las ventanas serán cerradas de inmediato sin preguntarle al usuario, y los eventos before-quit y will-quit no serán emitidos.

## app.relaunch([options])

    options Object (opcional)
    args string[] - (opcional)
    execPath string (opcional)
    Reinicia la aplicación cuando la instancia se cierra.

Por defecto, la nueva instancia va a usar el mismo directorio de trabajo y los argumentos de la linea de comando con la instancia actual. Cuando args es especificada, el args se convertirá en un argumento de la linea de comandos. Cuando execPath es especificado, elexecPath Será ejecutado en el relanzador en vez de la aplicación en curso.

Note que este método no cierta la aplicación cuando esta es ejecutada, tiene que llamar app.quit o app.exit después de llamar app.relaunch para hacer que la aplicación se reinicie.

Cuando app.relaunch es llamada múltiples veces, múltiples instancias serán iniciadas después de que la actual instancia se cierre.

Un ejemplo de reiniciar la instancia actual de forma inmediata y agregar un nuevo argumento a la línea de comando de la nueva instancia:

const { app } = require('electron')

app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
app.exit(0)

## app.isReady()

Devuelve boolean - true si Electron ha finalizado la inicialización, de otra manera false. Ver también app.whenReady().

## app.getAppPath()

Devuelve string - El directorio de la aplicación actual.

## app.getPath(name)

name string - Puedes solicitar las siguientes rutas por el nombre:
Inicio Directorio de inicio del usuario.
appData Directorio de datos de la aplicación por usuario, el cual por defecto apunta a:
%APPDATA% en Windows
$XDG_CONFIG_HOME o ~/.config en Linux
~/Library/Application Support en marcOS
Información del usuario El directorio para almacenar los archivos de la configuración de su aplicación, que es el directorio appData por defecto unida con el nombre de su aplicación.
chaché
temp Directorio temporal.
exe Archivo ejecutable en curso.
module la librería libchromiumcontent.
escritorio El directorio del escritorio del usuario en curso.
documentos Directorio para la carpeta "Mis documentos" del usuario.
descargas Directorio para las descargas del usuario.
musica Directorio para la música del usuario.
imágenes Directorio para las imágenes del usuario.
videos Directorio para las imágenes del usuario.
recent Directorio para los documentos recientes del usuario (solo Windows).
logs Directorio para los archivos de registro de la aplicación.
crashDumps Directorio donde se almacenan los volcados de fallos.
Devuelve string - Una ruta a un directorio especial o a un archivo asociado con name. En caso de falla, un Error es lanzado.

Si se llama a app.getPath('logs') sin que se llame primero a app.setAppLogsPath(), se creará un directorio de registro por defecto equivalente a llamar a app.setAppLogsPath() sin un parámetro path.

```important
  console.log(app.getPath('userData'));// useData returna el directorio por default que almacena toda la data asociada con tu aplicaccion

```
