#!/bin/bash

# Verificar ambiente de producción
if [ ! -f .env.production ]; then
    echo "Error: Archivo .env.production no encontrado"
    exit 1
fi

# Construir y desplegar con Docker
echo "Construyendo imagen Docker..."
docker-compose build

echo "Iniciando servicios..."
docker-compose up -d

echo "Verificando logs..."
docker-compose logs -f