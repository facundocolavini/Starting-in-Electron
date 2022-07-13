# Debugging

Pasos

- Configurar chrome para escuchar en el puerto que debe debugea la app.

Para inicializar la app en modo debugging podemos correr

electron --inspect=port .

electron --inspect=5858 .

abrir chrome ir a chrome://inspect

añadir nuestro localhost a nuestra session de debuggin

Para ejecutar un breakpoint cuando la app se ejecute

electron --inspect-brk=port .

electron --inspect-brk=5858 .
