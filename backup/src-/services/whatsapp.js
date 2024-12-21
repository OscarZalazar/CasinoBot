import { Client } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { handleIncomingMessage } from '../controllers/messageHandler.js';
import { logger } from '../utils/logger.js';
import { settingsManager } from '../config/settings.js';

const client = new Client({
  puppeteer: {
    args: ['--no-sandbox']
  }
});

let isAutoReplyEnabled = true;

export function setupWhatsApp() {
  client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    logger.info('QR Code generated');
  });

  client.on('ready', () => {
    logger.info('WhatsApp client is ready');
  });

  client.on('message', async (message) => {
    // Verificar si el mensaje es un comando de control
    if (message.body === '!bot off' && await isAdmin(message.from)) {
      isAutoReplyEnabled = false;
      sendMessage(message.from, '🤖 Bot desactivado. Los mensajes serán manejados manualmente.');
      return;
    }

    if (message.body === '!bot on' && await isAdmin(message.from)) {
      isAutoReplyEnabled = true;
      sendMessage(message.from, '🤖 Bot activado. Respondiendo automáticamente.');
      return;
    }

    // Solo procesar mensajes si el bot está activado
    if (isAutoReplyEnabled) {
      handleIncomingMessage(message);
    }
  });

  return client.initialize();
}

async function isAdmin(number) {
  const settings = settingsManager.get();
  // El número del administrador debe configurarse en el panel
  return settings.whatsapp.adminNumber === number;
}

export async function sendMessage(to, message) {
  try {
    await client.sendMessage(to, message);
  } catch (error) {
    logger.error('Error sending message:', error);
    throw error;
  }
}

export function getBotStatus() {
  return isAutoReplyEnabled;
}