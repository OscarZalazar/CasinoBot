#!/bin/bash

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}Iniciando despliegue del Casino Bot${NC}"

# 1. Crear estructura de directorios
echo "Creando estructura de directorios..."
mkdir -p casino-bot/{data,logs,public}

# 2. Instalar dependencias del sistema
echo "Instalando dependencias del sistema..."
sudo apt-get update
sudo apt-get install -y \
    nodejs \
    npm \
    chromium \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxrandr2 \
    libasound2 \
    libatk1.0-0 \
    libgtk-3-0

# 3. Instalar PM2 globalmente
echo "Instalando PM2..."
sudo npm install -g pm2

# 4. Instalar dependencias del proyecto
echo "Instalando dependencias del proyecto..."
cd casino-bot
npm install

# 5. Construir el proyecto
echo "Construyendo el proyecto..."
npm run build

# 6. Configurar PM2
echo "Configurando PM2..."
pm2 start ecosystem.config.js --env production
pm2 save

# 7. Configurar inicio automático
echo "Configurando inicio automático..."
pm2 startup

echo -e "${GREEN}¡Despliegue completado!${NC}"