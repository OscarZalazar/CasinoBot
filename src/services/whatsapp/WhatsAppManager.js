import { Client } from 'whatsapp-web.js';
import { log } from '../../utils/logger.js';
import { getDB, saveDB } from '../database.js';

class WhatsAppManager {
  constructor() {
    this.clients = new Map();
    this.sessions = new Map();
  }

  async initializeClient(clientId) {
    try {
      // Verificar si ya existe una instancia
      if (this.clients.has(clientId)) {
        return this.clients.get(clientId);
      }

      // Crear nueva instancia de cliente
      const client = new Client({
        puppeteer: {
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
      });

      // Manejar eventos
      client.on('qr', (qr) => {
        this.sessions.set(clientId, { qr, status: 'pending' });
        log(`QR Code generated for client ${clientId}`);
      });

      client.on('ready', () => {
        this.sessions.set(clientId, { status: 'connected' });
        this.updateClientStatus(clientId, true);
        log(`WhatsApp client ready for ${clientId}`);
      });

      client.on('disconnected', () => {
        this.sessions.delete(clientId);
        this.clients.delete(clientId);
        this.updateClientStatus(clientId, false);
        log(`WhatsApp client disconnected for ${clientId}`);
      });

      // Guardar cliente
      this.clients.set(clientId, client);

      // Inicializar cliente
      await client.initialize();
      return client;
    } catch (error) {
      log(`Error initializing WhatsApp client: ${error.message}`, 'error');
      throw error;
    }
  }

  async getClientStatus(clientId) {
    const session = this.sessions.get(clientId);
    return {
      status: session?.status || 'disconnected',
      qr: session?.qr
    };
  }

  async updateClientStatus(clientId, connected) {
    const db = await getDB();
    const client = db.clients.find(c => c.id === clientId);
    if (client) {
      client.whatsappConnected = connected;
      await saveDB(db);
    }
  }

  async disconnectClient(clientId) {
    const client = this.clients.get(clientId);
    if (client) {
      await client.destroy();
      this.clients.delete(clientId);
      this.sessions.delete(clientId);
      await this.updateClientStatus(clientId, false);
    }
  }
}

export const whatsAppManager = new WhatsAppManager();