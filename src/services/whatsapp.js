import { Client } from 'whatsapp-web.js';
import qrcode from 'qrcode';
import { getClientSession, saveClientSession } from './database.js';

const clients = new Map();

export async function generateWhatsAppQR(clientId) {
  try {
    // Crear nueva instancia de cliente WhatsApp
    const client = new Client({
      puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    });

    // Manejar generación de QR
    return new Promise((resolve, reject) => {
      client.on('qr', async (qr) => {
        try {
          // Generar QR como data URL
          const qrDataUrl = await qrcode.toDataURL(qr);
          resolve(qrDataUrl);
        } catch (error) {
          reject(error);
        }
      });

      client.on('ready', async () => {
        // Guardar sesión del cliente
        clients.set(clientId, client);
        await saveClientSession(clientId, client.session);
      });

      client.initialize();
    });
  } catch (error) {
    throw new Error('Error generating WhatsApp QR: ' + error.message);
  }
}

export async function getWhatsAppStatus(clientId) {
  const client = clients.get(clientId);
  return {
    connected: client?.isConnected() || false
  };
}