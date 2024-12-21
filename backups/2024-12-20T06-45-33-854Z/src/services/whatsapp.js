import { Client } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { handleIncomingMessage } from '../controllers/messageHandler.js';
import { logger } from '../utils/logger.js';
import { settingsManager } from '../config/settings.js';
import { chromium } from 'puppeteer';

let client = null;
let isAutoReplyEnabled = true;

export async function setupWhatsApp() {
  try {
    // Configurar el navegador Chrome
    const browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080'
      ]
    });

    client = new Client({
      puppeteer: {
        browserWSEndpoint: browser.wsEndpoint()
      }
    });

    client.on('qr', (qr) => {
      logger.info('Nuevo código QR generado. Por favor escanéalo con WhatsApp:');
      qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
      logger.info('¡Cliente de WhatsApp conectado y listo!');
    });

    client.on('message', async (message) => {
      if (isAutoReplyEnabled) {
        await handleIncomingMessage(message);
      }
    });

    await client.initialize();
    return client;
  } catch (error) {
    logger.error('Error inicializando WhatsApp:', error);
    throw error;
  }
}

export async function sendMessage(to, message) {
  try {
    if (!client) {
      throw new Error('Cliente de WhatsApp no inicializado');
    }
    await client.sendMessage(to, message);
  } catch (error) {
    logger.error('Error enviando mensaje:', error);
    throw error;
  }
}

export function getBotStatus() {
  return isAutoReplyEnabled;
}

export function toggleBot(enabled) {
  isAutoReplyEnabled = enabled;
  return isAutoReplyEnabled;
}