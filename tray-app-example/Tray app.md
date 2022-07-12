## Tray App

- Tray app con electron

- npm i -D electron@latest

- Insatalar nodemon para ambiente de ejecutcion

## Funcionalidades tips

## Puntos de la aplicación

## Electron

- Cuando se instala la aplicacion , que te diga que se va a inicializar con window
- Hacer un setup para instalar la aplicaciones
- El setup tiene que configurar la aplicacion para que arranque con el sistema operativo
- Cuando se inicia tiene que iniciar en el tray bar y no abierta
- Cada 30 seg que aparezca una notificacion de prueba con la fecha y la hora y si tiene sesion el usuario.
- Cuando se instala la aplicacion se crea una carpeta logs para probar que se guarden las notificacion con winstone (winstone es un packages)
- Menu desplegable cuando hacemos click derecho debe mostrar :
  - El boton exit para cerrar la aplicacion
  - Iniciar session => tiene que abrir una ventana tipo login (usuario, password)
  - Cuando se ingresa las credenciales el usuario y la password hay que generar un archivo json con esos datos que se ingresaron.
  - Cerrar sesion (Reemplaza la del login) si el archivo existe muestro iniciar session. Si esta en modo iniciar session debo borrar el archivo.
  - Prueba de conexion (fetch a una api cualquiera) y al devolverme los resultados prueba ok si da ok que me muestre la cantidad de registros o el error al no conectarse. Cada 30 seg ejecuta esa api para saber si hay una sesion.
  - Ver logs que lo que hace es abrir la carpeta de logs (Nada mas la abre en esa ubicacion)
  - Limpiar logs (borra los archivos logs)
  - Si el usuario no esta logeado no debe hacer nada.
