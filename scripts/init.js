import { initializeSystem } from '../src/config/init.js';
import { createFirstClient } from './createFirstClient.js';
import { setupWhatsApp } from '../src/services/whatsapp.js';
import { casinoScrapingFactory } from '../src/services/scraping';
import { logger } from '../src/utils/logger.js';

async function init() {
  try {
    // Inicializar sistema y obtener credenciales encriptadas
    logger.info('Inicializando sistema...');
    const credentials = await initializeSystem();

    // Crear primer cliente
    logger.info('Creando primer cliente...');
    const client = await createFirstClient();

    // Inicializar servicio de scraping
    logger.info('Inicializando servicio de scraping...');
    const scraper = await casinoScrapingFactory.getScraperForCasino({
      id: 'lucky',
      url: process.env.CASINO_API_URL,
      username: process.env.CASINO_USERNAME,
      password: process.env.CASINO_PASSWORD
    });

    // Probar conexión con el casino
    logger.info('Probando conexión con el casino...');
    await scraper.login();

    // Inicializar WhatsApp
    logger.info('Inicializando WhatsApp...');
    await setupWhatsApp();

    logger.info('Sistema inicializado correctamente');
    return true;
  } catch (error) {
    logger.error('Error en la inicialización:', error);
    process.exit(1);
  }
}

init();