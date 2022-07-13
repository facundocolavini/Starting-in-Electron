# Resetear el proyecto

Para resetear el proyecto existe el comando git reset

Este comando limpia todos las devDependecies que tenemos instaladas en nuesto package.json

"reset": "git reset --hard"

Si estamos utilizando estas dependencias en algunos de nuestros archivos js se eliminaran.
Tener cuidado al utilizarlo

Lista las dependencias instaladas
npm list --depth=0
