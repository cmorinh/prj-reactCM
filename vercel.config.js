module.exports = {
  // Configuración para SPA (Single Page Application)
  buildCommand: "npm run build",
  outputDirectory: "dist",
  
  // Configuración de rutas para React Router
  routes: [
    {
      src: "/static/(.*)",
      dest: "/static/$1"
    },
    {
      src: "/favicon.ico",
      dest: "/favicon.ico"
    },
    {
      src: "/manifest.json",
      dest: "/manifest.json"
    },
    {
      src: "/robots.txt",
      dest: "/robots.txt"
    },
    {
      src: "/sitemap.xml",
      dest: "/sitemap.xml"
    },
    // Redirigir todas las rutas de la aplicación a index.html
    {
      src: "/(.*)",
      dest: "/index.html"
    }
  ],

  // Configuración de headers para SEO y seguridad
  headers: [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff"
        },
        {
          key: "X-Frame-Options",
          value: "DENY"
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block"
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin"
        }
      ]
    },
    {
      source: "/static/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable"
        }
      ]
    }
  ],

  // Configuración de funciones para manejar SSR si es necesario
  functions: {
    "api/*.js": {
      runtime: "nodejs18.x"
    }
  },

  // Configuración de variables de entorno
  env: {
    NODE_ENV: "production"
  }
};
