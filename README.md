# Examen final BBDD + LMSGI

## Contexto

Tienes un backend creado con Express que actualmente gestiona un sistema de autenticacion HTTP Basic.

No existe base de datos, los usuarios y contraseñas están almacenados en el archivo `database/users.js` en un objeto con la siguiente estructura:

```javascript
{
  "user1": "password1",
  "user2": "password2"
}
```

Dispones de un middleware para autenticarlos, está localizado en `middleware/auth.js`.

El archivo `index.js` es el punto de entrada de la aplicación.

## Objetivo

Deberás implementar cuantas más funcionalidades puedas de las siguientes:

- Mejora el entorno de desarrollo, crea un script `dev` en el `package.json` que reinicie el servidor automáticamente al detectar cambios en el código fuente. ✔️
- Sustituir el objeto de usuarios por una base de datos SQLite3 o mySQL. ✔️
- Añade una pagina de registro de usuarios: ✔️
  - El registro debe ser accesible desde la ruta `/register`.
  - El formulario de registro debe solicitar un `username`, `password`.
- Añade un linter y crea un script `lint` en el `package.json` que arregle los errores de estilo. ✔️
- Busca información sobre el sistema de autenticación usado en este proyecto, documenta **como funciona**, además de **sus ventajas y desventajas** frente a otros mecanismos de autenticación. ✔️

He utilizado express-session para la autenticación de usuarios, junto con bcrypt para un almacenamiento seguro de contraseñas.

Su funcionamiento consiste en un inicio de sesion, en el que cuando un usuario intenta autenticarse, su nombre y contraseña se envían al servidor. Despues se busca el usuario en la base de datos (User.findOne({ where: { name } })), y la contraseña puesta se compara con la almacenada usando bcrypt.compare(). Si la contraseña es valida, se almacena en el userId en la sesión (req.session.userId).

Las sesiones se manejan con express-session que crea una sesión para cada usuario que ha pasado la autenticacion, esta sesion  se almacena en una base de datos SQLite (connect-sqlite3). 

Y las rutas se protegen en isAuthenticated que verifica si req.session.userId existe antes de permitir el acceso.

Ventajas
- los usuarios pueden permanecer autenticados sin necesidad de volver a ingresar sus datos
- las contraseñas se almacenan de forma segura mediante hashing, evitando que sean accesibles en texto plano

Desventajas
- express-session almacena sesiones en el servidor, lo que puede ser un problema en aplicaciones con múltiples instancias
- las sesiones requieren almacenamiento en el servidor, lo que puede ser vulnerable a ataques de sesión
- si el usuario desactiva las cookies, la autenticación basada en sesiones puede no funcionar correctamente