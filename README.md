# Pescetto

Pescetto es una aplicación web desarrollada con **React**, **TypeScript** y **Vite**.

🌍 **Demo en vivo:** [https://pescettoweb3.vercel.app](https://pescettoweb3.vercel.app/)

Esta guía te ayudará a instalar las dependencias, arrancar el servidor de desarrollo y construir la aplicación para producción.

## Requisitos previos

- Node.js (versión recomendada 18+ o 20+)
- npm (el gestor de paquetes de Node.js)
- Una wallet compatible instalada (por ejemplo, [MetaMask](https://metamask.io/)) para interactuar con las funcionalidades Web3 de la aplicación.

## Instalación

1. Clona el repositorio o sitúate en la carpeta raíz del proyecto.
2. Abre una terminal en dicho directorio.
3. Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
npm install
```

## Comandos de arranque y utilidad

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

### Arrancar en modo desarrollo

```bash
npm run dev
```

Inicia el servidor de desarrollo de Vite. Por defecto, puedes abrir [http://localhost:5173](http://localhost:5173) para ver la aplicación en tu navegador (la página se recargará automáticamente si haces cambios en el código).

_Nota para pruebas en móvil: Si vas a probar la app en un dispositivo móvil en tu red local (por ejemplo `http://192.168.1.90:5173`), asegúrate de abrir la URL usando el navegador **interno** de la app de MetaMask para que reconozca tu wallet correctamente._

### Construcción para producción

```bash
npm run build
```

Empaqueta y compila de forma optimizada la aplicación para producción dentro de la carpeta `dist`.

### Previsualizar la producción

```bash
npm run preview
```

Inicia un servidor web local estático que sirve los archivos de la carpeta `dist`. Es ideal para comprobar que el código minificado funciona correctamente antes de publicarlo.

### Comprobación de código (Linting)

```bash
npm run lint
```

Ejecuta ESLint en el código para encontrar y reportar posibles errores de estilo o sintaxis.

## Uso

1. Inicia la aplicación con `npm run dev` y ábrela en el navegador.
2. En la interfaz principal de la aplicación, haz clic en el botón de **Conectar monedero**.
3. Tu navegador gestionará la petición abriendo la extensión de MetaMask o cualquier wallet inyectada compatible (`window.ethereum`).
4. Confirma la conexión. Una vez enlazada, la aplicación mostrará información como tu saldo y dirección.
5. Puedes interactuar con la aplicación según las funcionalidades habilitadas. Cuando hayas terminado, puedes pulsar **Desconectar** para limpiar el estado de la conexión en la aplicación web.
