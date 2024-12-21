#!/bin/bash

# Verificar Node.js y npm
if ! command -v node &> /dev/null; then
    echo "Instalando Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Instalar PM2 globalmente
if ! command -v pm2 &> /dev/null; then
    echo "Instalando PM2..."
    sudo npm install -g pm2
fi

# Instalar dependencias del sistema
echo "Instalando dependencias del sistema..."
sudo apt-get update
sudo apt-get install -y \
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

# Crear directorios necesarios
mkdir -p data logs

# Configurar permisos
chmod +x deploy.sh

echo "Instalación completada. Ejecute ./deploy.sh para iniciar la aplicación."