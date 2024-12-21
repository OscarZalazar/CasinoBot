import { Client } from 'whatsapp-web.js';
import { getClientSession, saveClientSession } from './database.js';
import { updateClientWhatsAppStatus } from './clientManager.js';
import { log } from '../utils/logger.js';

const clients = new Map();

export async function initializeWhatsAppClient(clientId) {
  try {
    // Verificar si ya existe una instancia
    if (clients.has(clientId)) {
      return clients.get(clientId);
    }

    // Crear nueva instancia
    const client = new Client({
      puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      },
      session: await getClientSession(clientId)
    });

    // Manejar eventos
    client.on('qr', async (qr) => {
      // Guardar QR para mostrarlo en el frontend
      await saveClientSession(clientId, { qr, status: 'pending' });
    });

    client.on('ready', async () => {
      await updateClientWhatsAppStatus(clientId, true);
      await saveClientSession(clientId, { status: 'connected' });
      log(`WhatsApp client ready for client ${clientId}`);
    });

    client.on('disconnected', async () => {
      await updateClientWhatsAppStatus(clientId, false);
      await saveClientSession(clientId, { status: 'disconnected' });
      clients.delete(clientId);
      log(`WhatsApp client disconnected for client ${clientId}`);
    });

    // Inicializar cliente
    await client.initialize();
    clients.set(clientId, client);
    
    return client;
  } catch (error) {
    log(`Error initializing WhatsApp client: ${error.message}`, 'error');
    throw error;
  }
}

export async function getWhatsAppStatus(clientId) {
  const session = await getClientSession(clientId);
  return session?.status || 'disconnected';
}

export async function disconnectWhatsApp(clientId) {
  const client = clients.get(clientId);
  if (client) {
    await client.destroy();
    clients.delete(clientId);
    await updateClientWhatsAppStatus(clientId, false);
    await saveClientSession(clientId, { status: 'disconnected' });
  }
}