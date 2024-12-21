# Casino Bot Admin

Sistema de administración para bots de casino con WhatsApp.

## Requisitos

- Node.js 18 o superior
- PM2
- Chromium
- Dependencias del sistema (ver install.sh)

## Instalación

1. Clonar el repositorio:
\`\`\`bash
git clone <repository-url>
cd casino-bot-admin
\`\`\`

2. Ejecutar el script de instalación:
\`\`\`bash
chmod +x install.sh
./install.sh
\`\`\`

3. Configurar variables de entorno:
\`\`\`bash
cp .env.example .env.production
# Editar .env.production con los valores correctos
\`\`\`

4. Desplegar la aplicación:
\`\`\`bash
./deploy.sh
\`\`\`

## Estructura del Proyecto

- `/src` - Código fuente
  - `/admin` - Panel de administración (React)
  - `/services` - Servicios principales
  - `/utils` - Utilidades
- `/data` - Datos persistentes
- `/logs` - Archivos de registro

## Mantenimiento

- Logs: `/logs/bot.log`
- PM2: `pm2 logs casino-bot`
- Reiniciar: `pm2 restart casino-bot`