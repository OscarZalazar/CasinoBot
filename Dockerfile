FROM node:18-slim

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    chromium \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxrandr2 \
    libasound2 \
    libatk1.0-0 \
    libgtk-3-0 \
    && rm -rf /var/lib/apt/lists/*

# Crear directorios de la aplicación
WORKDIR /app
RUN mkdir -p data logs

# Copiar archivos del proyecto
COPY package*.json ./
COPY . .

# Instalar dependencias
RUN npm ci --only=production

# Construir frontend
RUN npm run build

# Variables de entorno
ENV NODE_ENV=production
ENV CHROME_PATH=/usr/bin/chromium

# Exponer puerto
EXPOSE 3000

# Iniciar aplicación
CMD ["npm", "start"]