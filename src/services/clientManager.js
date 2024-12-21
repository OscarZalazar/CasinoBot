import { getDB, saveDB } from './database.js';
import { hashPassword } from '../utils/crypto.js';
import { log } from '../utils/logger.js';

export async function createClient(clientData) {
  try {
    const db = await getDB();
    
    // Verificar si el email ya existe
    if (db.clients.some(c => c.email === clientData.email)) {
      throw new Error('Email already exists');
    }

    // Hash de la contraseña
    const hashedPassword = await hashPassword(clientData.password);
    
    const newClient = {
      id: Date.now().toString(),
      name: clientData.name,
      email: clientData.email,
      password: hashedPassword,
      whatsappNumber: clientData.whatsappNumber,
      whatsappConnected: false,
      createdAt: new Date().toISOString()
    };

    db.clients.push(newClient);
    await saveDB(db);

    // No devolver la contraseña
    const { password, ...clientWithoutPassword } = newClient;
    return clientWithoutPassword;
  } catch (error) {
    log(`Error creating client: ${error.message}`, 'error');
    throw error;
  }
}

export async function getClient(clientId) {
  const db = await getDB();
  const client = db.clients.find(c => c.id === clientId);
  if (!client) return null;
  
  // No devolver la contraseña
  const { password, ...clientWithoutPassword } = client;
  return clientWithoutPassword;
}

export async function updateClientWhatsAppStatus(clientId, connected) {
  const db = await getDB();
  const client = db.clients.find(c => c.id === clientId);
  if (!client) throw new Error('Client not found');
  
  client.whatsappConnected = connected;
  await saveDB(db);
}