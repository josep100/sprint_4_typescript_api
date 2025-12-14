# 🚀 sprint_4_typescript_api

En este bloque temático aprenderás dos conceptos fundamentales del desarrollo web actual: TypeScript y el consumo de APIs.

---

## 📌 Descripción

Esta aplicación web muestra chistes a las personas trabajadoras antes de iniciar su jornada laboral, con el objetivo de mejorar el estado de ánimo y la productividad.

A diferencia de proyectos anteriores donde los datos estaban integrados directamente en el código (hardcoded), esta aplicación consume datos de una API REST externa, gratuita y sin necesidad de autenticación. Gracias a ello, los chistes se obtienen de forma dinámica mediante llamadas HTTP a un servidor.

---

## 📁 Estructura del proyecto
```
├── public/                     # Archivos públicos (si aplica)
├── src/                        
       ├── assets               # Imágenes SVG
       ├── css                  # Estilos de la web
       ├── ts                   # Código fuente
├── test/                       # Pruebas automatizadas
├── .gitignore
├── index.html                  # Página principal 
├── package.json                # Dependencias y scripts
├── tsconfig.json               # Configuración TypeScript
├── vite.config.ts              # Configuración del bundler para TS 
```

## 💻 Technology Stack:

- TypeScript
- Vite
- CSS Vanille
- Vitest
- npm

## 🚀 Instalación (Local)

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

1. **Clonar el repositorio**  
   ```
    git clone https://github.com/josep100/sprint_4_typescript_api.git
   ```
2. **Moverse a la carpeta del proyecto**
   ``` 
   cd sprint_4_typescript_api
   ```

3. **Instalar dependencias**
   ``` 
   npm install
   ```
4. **Levantar el servidor en modo desarrollo**
   ``` 
   npm run dev
   ```

## 🧪 Pruebas (Testing)

Este proyecto incluye tests que cubren la lógica principal y la llamada a la API.

**Los tests se ejecutan con:**
```
npm run test
```


   