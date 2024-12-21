import { config } from 'dotenv';
import { setupWhatsApp } from './services/whatsapp.js';
import { setupServer } from './server.js';
import { casinoManager } from './services/casinoManager.js';
import { settingsManager } from './config/settings.js';
import { logger } from './utils/logger.js';

config();

async function startApplication() {
  try {
    // Cargar configuración
    await settingsManager.load();
    const settings = settingsManager.get();

    // Inicializar el proveedor del casino
    await casinoManager.initializeProvider(settings.casino.provider, settings.casino);

    // Inicializar WhatsApp y servidor
    await setupWhatsApp();
    await setupServer();

    logger.info('Application started successfully');
  } catch (error) {
    logger.error('Failed to start application:', error);
    process.exit(1);
  }
}

// Manejar el cierre graceful de la aplicación
process.on('SIGTERM', async () => {
  logger.info('Shutting down application...');
  await casinoManager.cleanup();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('Shutting down application...');
  await casinoManager.cleanup();
  process.exit(0);
});

startApplication();