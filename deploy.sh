#!/bin/bash

# Verificar ambiente de producción
if [ ! -f .env.production ]; then
    echo "Error: Archivo .env.production no encontrado"
    exit 1
fi

# Instalar dependencias
echo "Instalando dependencias..."
npm ci

# Construir el frontend
echo "Construyendo frontend..."
npm run build

# Configurar PM2
echo "Configurando PM2..."
pm2 start ecosystem.config.js --env production

echo "Deployment completado exitosamente"