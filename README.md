# Datathon Frontend

Frontend del proyecto Datathon, desarrollado con React, TypeScript y Vite.

## 📋 Resumen

Interfaz web para visualizar e interactuar con los resultados del proyecto Datathon. Incluye componentes para explicación de modelos (gráficos, LIME/SHAP, etc.), chatbot y formularios de predicción.

## 🚀 Tech Stack

- `React` + `TypeScript`
- `Vite` (dev server y bundling)
- `ESLint` (linting)
- `Recharts` (gráficos)
- `Chakra UI` (componentes UI)

## 📦 Prerrequisitos

- Node.js (v18 o superior recomendado)
- `npm` como gestor de paquetes

## 🛠️ Instalación (rápida)

1. Clona el repositorio:
```bash
git clone https://github.com/Davi-Paiva/datathon-front.git
cd datathon-front
```

2. Instala dependencias base:
```bash
npm install
```

3. Instala dependencias adicionales usadas por el proyecto:
```bash
npm install recharts
npm i @chakra-ui/react @emotion/react
```

4. Agrega snippets de Chakra UI para acelerar el desarrollo:
```bash
npx @chakra-ui/cli snippet add
```

> Nota: los pasos 3-4 son necesarios porque el proyecto utiliza `Recharts` y componentes de `Chakra UI` en varios componentes dentro de `src/`.

## 🏃 Ejecutar la aplicación

- Modo desarrollo (hot reload):
```bash
npm run dev
```

- Build para producción:
```bash
npm run build
```

- Previsualizar build de producción:
```bash
npm run preview
```

## 🧪 Desarrollo

- Ejecutar ESLint:
```bash
npm run lint
```

## 📁 Estructura principal de carpetas

```
datathon-front/
├── src/
│   ├── components/    # Componentes React (ChatBot, gráficos, forms, etc.)
│   ├── pages/         # Páginas principales
│   ├── services/      # Llamadas a APIs y lógica de ML
│   └── types/         # Tipos TypeScript
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🔗 Repositorio del backend

- Backend API: `https://github.com/ppuig2503/datathon2025-backend-JAPD.git`

## 👥 Colaboradores

- Alejandro Poole
- Davi Paiva
- Joan Vicente
- Pau Puig

## 📄 Licencia

Proyecto desarrollado para la competición Datathon.