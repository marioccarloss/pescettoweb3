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

## Arquitectura y Diseño

Este proyecto está construido siguiendo los principios de la **Arquitectura Hexagonal** (también conocida como arquitectura de Puertos y Adaptadores). 

El objetivo principal de esta arquitectura es **separar drásticamente** la lógica de negocio puramente teórica de los detalles de infraestructura (como los renders de React, la conexión a la blockchain con MetaMask o APIs externas).

### Beneficios a futuro

1. **Agnosticismo tecnológico:** La lógica y estado de la aplicación no dependen explícitamente de React ni de MetaMask. Si en el futuro queremos cambiar la librería de UI o añadir soporte para múltiples wallets (WalletConnect, Phantom, etc.), podemos hacerlo construyendo nuevos adaptadores sin tocar una sola línea de la lógica de negocio o de aplicación.
2. **Alta testabilidad:** La lógica (el núcleo de la aplicación) puede probarse de forma unitaria y ultra rápida porque no interactúa con el DOM del navegador o con la extensión de criptomonedas directamente.
3. **Mantenibilidad robusta:** Todo código se sitúa donde debe estar. Es extremadamente fácil navegar, aislar bugs, hacer refactorizaciones o añadir funcionalidades complejas, minimizando enormemente el nivel de código acoplado (el famoso _código espagueti_).
4. **Escalabilidad del equipo:** Al estar el código tan sumamente delimitado y ordenado, permite que varios desarrolladores pueden trabajar paralelamente en aspectos visuales (React) o integraciones Web3 y lógicas (servicios internos) sin pisarse.

### Organización de carpetas

El proyecto está estructurado estrictamente bajo un patrón por capas dentro del directorio principal `src/`:

- **`src/domain/`** (Reglas de negocio puro): Contiene los modelos base (como `wallet.ts`) y los **contratos/interfaces** (repositorios) que determinan qué pueden hacer las dependencias externas. No importa en absoluto que React exista y su código es TypeScript puro orientado totalmente a negocio.
- **`src/application/`** (Casos de Uso): Orquestan y estructuran acciones lógicas utilizando los repositorios del dominio (ej. `connect-wallet.ts` o `disconnect-wallet.ts`). Toman decisiones basadas en datos aislados.
- **`src/infrastructure/`** (Detalles Técnicos): Esta es la capa externa. Se encarga de hacer funcionar las implementaciones reales. Destacan concretamente:
  - **`adapters/`**: Son las implementaciones que resuelven los contratos impuestos por `domain`. Aquí es donde vive toda la lógica ligada a MetaMask (`metamask-adapter.ts`).
  - **`store/`**: Mantiene en memoria y reacciona al estado global de la aplicación (`wallet-store.ts`) publicándola de un modo neutral e independiente del render. En nuestro caso, a través de variables suscritas estilo `useSyncExternalStore`.
  - **`ui/`**: Toda la librería visual en React, los componentes aislados (`wallet-connector.tsx`) implementando estilos CSS mediante inyección con BEM. Es el lugar de visualización y de recepción de los eventos del usuario, no debe poseer "lógica de negocio profunda".
