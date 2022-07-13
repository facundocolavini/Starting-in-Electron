## Node moudles

Se pueden instalar modulos nativos de npm para utilizar en electron.

Hay que tener cuidado con las versionas para que no rompa la version. podemos solucionarlo instalarlo globalmente
npm i

esto pasa con el npm bscrypt
npm i bcrypt

se debe instalar globalmente por que Electron contiene una version interna distinta de nuestro V8 engine.Ya que al a compilarlo con una version erronea la aplicacion va a realizar un crash.

npm i -g bcrypt

Para hacer una reinstalacion de algunos modulos utilizar comando:

electron-rebuild bcrypt
