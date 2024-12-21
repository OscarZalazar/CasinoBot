import { Client } from '../models/Client.js';
import { logger } from '../utils/logger.js';
import { encrypt, decrypt } from '../utils/encryption.js';

class ClientManager {
  constructor() {
    this.clients = new Map();
  }

  async createClient(clientData) {
    try {
      // Validar datos del cliente
      if (!clientData.email || !clientData.password) {
        throw new Error('Email y contraseña son requeridos');
      }

      // Verificar si el email ya existe
      if (this.findByEmail(clientData.email)) {
        throw new Error('El email ya está registrado');
      }

      // Crear nuevo cliente
      const client = await Client.create(clientData);
      
      // Encriptar datos sensibles
      const encryptedData = encrypt(JSON.stringify(client));
      this.clients.set(client.id, encryptedData);

      logger.info('Cliente creado exitosamente:', { clientId: client.id });
      return client.toJSON();
    } catch (error) {
      logger.error('Error creando cliente:', error);
      throw error;
    }
  }

  findByEmail(email) {
    for (const encryptedData of this.clients.values()) {
      const clientData = JSON.parse(decrypt(encryptedData));
      if (clientData.email === email) {
        return new Client(clientData);
      }
    }
    return null;
  }

  async updateClientSettings(clientId, settings) {
    try {
      const encryptedData = this.clients.get(clientId);
      if (!encryptedData) {
        throw new Error('Cliente no encontrado');
      }

      const clientData = JSON.parse(decrypt(encryptedData));
      clientData.settings = { ...clientData.settings, ...settings };
      clientData.updatedAt = new Date();

      const updatedEncryptedData = encrypt(JSON.stringify(clientData));
      this.clients.set(clientId, updatedEncryptedData);

      logger.info('Configuración del cliente actualizada:', { clientId });
      return new Client(clientData).toJSON();
    } catch (error) {
      logger.error('Error actualizando configuración del cliente:', error);
      throw error;
    }
  }
}

export const clientManager = new ClientManager();