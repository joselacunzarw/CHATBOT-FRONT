# AI Chat Assistant

Asistente de chat inteligente con autenticación de Google y una interfaz moderna y responsiva.

## Características

- 🔐 Autenticación con Google
- 💬 Chat en tiempo real con IA
- 📱 Diseño responsivo
- ⌨️ Indicadores de escritura
- 🕒 Historial de mensajes persistente
- 👤 Avatares personalizados
- 🌐 Soporte para modo widget y página completa

## Requisitos Previos

- Node.js 20.x o superior
- Cuenta de Google Cloud Platform con OAuth 2.0 configurado
- Variables de entorno configuradas

## Configuración

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo `.env` con las siguientes variables:
```env
VITE_GOOGLE_CLIENT_ID=tu_client_id_de_google
VITE_API_URL=http://127.0.0.1:5000
```

## Desarrollo

Iniciar en modo desarrollo:

```bash
npm run dev
```

## Producción

Construir para producción:

```bash
npm run build
```

### Docker

Desarrollo:
```bash
docker-compose up dev
```

Producción:
```bash
docker-compose up prod
```

## Estructura del Proyecto

```
├── src/
│   ├── components/     # Componentes React
│   ├── services/       # Servicios API
│   ├── store/         # Estado global (Zustand)
│   ├── types/         # Tipos TypeScript
│   └── config.ts      # Configuración
├── public/            # Archivos estáticos
└── docker/           # Configuración Docker
```

## Tecnologías

- React + TypeScript
- Vite
- Tailwind CSS
- Zustand
- @react-oauth/google
- Lucide React
- date-fns
- Docker

## Características en Desarrollo

- [ ] Soporte para archivos adjuntos
- [ ] Modo widget
- [ ] Métricas de usuario
- [ ] Temas personalizables

## Licencia

MIT

## Contacto

Para preguntas o sugerencias, por favor abrir un issue en el repositorio.