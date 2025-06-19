# 🛍️ STORE - E-commerce React Application

Una aplicación de comercio electrónico moderna construida con React, Vite y Bootstrap que permite a los usuarios explorar productos, gestionar un carrito de compras y administrar su perfil de usuario.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Funcionalidades](#-funcionalidades)
- [API Externa](#-api-externa)
- [Contextos](#-contextos)
- [Rutas Protegidas](#-rutas-protegidas)
- [Scripts Disponibles](#-scripts-disponibles)

## ✨ Características

- **🏠 Página de Inicio**: Muestra todos los productos disponibles
- **👕 Categorías de Productos**: Ropa, Electrónicos y Joyería
- **🛒 Carrito de Compras**: Gestión completa con persistencia local
- **👤 Sistema de Autenticación**: Login/Logout con validación
- **🔒 Rutas Protegidas**: Acceso restringido para usuarios autenticados
- **👨‍💼 Panel de Administración**: Área exclusiva para administradores
- **👤 Perfil de Usuario**: Gestión de información personal
- **📱 Diseño Responsivo**: Compatible con dispositivos móviles y desktop
- **⚡ Carga Dinámica**: Indicadores de carga para mejor UX

## 🛠️ Tecnologías Utilizadas

- **React 19.1.0** - Biblioteca de interfaz de usuario
- **Vite 6.3.5** - Herramienta de construcción y desarrollo
- **React Router DOM 7.6.0** - Enrutamiento de la aplicación
- **React Bootstrap 2.10.10** - Componentes de UI
- **Bootstrap 5.3.6** - Framework CSS
- **SweetAlert2 11.22.0** - Alertas y modales
- **Bootstrap Icons 1.13.1** - Iconografía
- **ESLint** - Linting de código

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/cmorinh/prj-reactCM.git
   cd prj-reactCM
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 📁 Estructura del Proyecto

```
prj-reactCM/
├── public/
│   ├── components/         # Componentes reutilizables
│   │   ├── Detail.jsx      # Vista detallada de productos
│   │   ├── Footer.jsx      # Pie de página
│   │   ├── Header.jsx      # Navegación principal
│   │   ├── ListContent.jsx # Lista de productos
│   │   ├── Loading.jsx     # Componente de carga
│   │   └── ProtectedRoutes.jsx # Rutas protegidas
│   ├── contexts/           # Contextos de React
│   │   ├── AuthContext.jsx # Gestión de autenticación
│   │   └── CartContext.jsx # Gestión del carrito
│   └── pages/              # Páginas principales
│       ├── Admin.jsx       # Panel de administración
│       ├── Cart.jsx        # Carrito de compras
│       ├── Dress.jsx       # Productos de ropa
│       ├── Electronics.jsx # Productos electrónicos
│       ├── Home.jsx        # Página principal
│       ├── Jewelry.jsx     # Productos de joyería
│       ├── Login.jsx       # Página de login
│       └── Profile.jsx     # Perfil de usuario
├── src/
│   ├── App.jsx            # Componente principal
│   ├── main.jsx           # Punto de entrada
│   └── index.css          # Estilos globales
├── package.json           # Dependencias y scripts
└── vite.config.js         # Configuración de Vite
```

## 🎯 Funcionalidades

### 🔐 Autenticación
- **Login**: Validación de email y contraseña (mínimo 8 caracteres)
- **Persistencia**: Los datos de sesión se mantienen en localStorage
- **Logout**: Cierre de sesión con limpieza de datos

### 🛍️ Gestión de Productos
- **Catálogo Completo**: Todos los productos disponibles en la página principal
- **Filtrado por Categorías**: 
  - Ropa (`/dress`)
  - Electrónicos (`/electronics`)
  - Joyería (`/jewelry`)
- **Vista Detallada**: Información completa de cada producto (`/detail/:id`)

### 🛒 Carrito de Compras
- **Agregar Productos**: Desde la vista detallada
- **Eliminar Productos**: Con confirmación mediante SweetAlert2
- **Persistencia**: Los productos se mantienen en localStorage
- **Checkout**: Proceso de compra simulado con animación de carga
- **Contador**: Muestra la cantidad de productos en el carrito

### 👤 Gestión de Usuario
- **Perfil**: Información del usuario autenticado
- **Cambio de Contraseña**: Funcionalidad simulada con SweetAlert2
- **Panel de Admin**: Área exclusiva para administradores

## 🌐 API Externa

La aplicación utiliza la **Fake Store API** (`https://fakestoreapi.com/products`) para obtener los datos de productos, incluyendo:
- Imágenes de productos
- Títulos y descripciones
- Precios
- Categorías

## 🔄 Contextos

### AuthContext
Gestiona el estado de autenticación de la aplicación

### CartContext
Gestiona el carrito de compras

## 🔒 Rutas Protegidas

Las siguientes rutas requieren autenticación:
- `/profile` - Perfil de usuario
- `/admin` - Panel de administración

Si un usuario no autenticado intenta acceder, será redirigido a `/login`.

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Construcción
npm run build        # Construye la aplicación para producción
npm run preview      # Previsualiza la build de producción

# Linting
npm run lint         # Ejecuta ESLint para verificar el código
```

## 🎨 Características de UI/UX

- **Diseño Responsivo**: Adaptable a diferentes tamaños de pantalla
- **Indicadores de Carga**: Spinners animados durante las operaciones
- **Alertas Interactivas**: SweetAlert2 para confirmaciones y notificaciones
- **Navegación Intuitiva**: Header con navegación clara y contador de carrito
- **Imágenes Optimizadas**: Carga de imágenes con dimensiones apropiadas

## 🔧 Configuración de Desarrollo

El proyecto incluye:
- **ESLint**: Configurado para React con reglas de hooks
- **Vite**: Configuración optimizada para desarrollo rápido
- **Hot Module Replacement (HMR)**: Recarga automática durante desarrollo

## 📦 Despliegue


---


