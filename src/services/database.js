import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { log } from '../utils/logger.js';

const DB_FILE = join(process.cwd(), 'data', 'db.json');

// Estructura inicial de la base de datos
const initialDB = {
  clients: [],
  sessions: {}
};

// Asegurar que existe el archivo de base de datos
async function ensureDB() {
  try {
    await readFile(DB_FILE);
  } catch {
    await writeFile(DB_FILE, JSON.stringify(initialDB, null, 2));
  }
}

export async function getDB() {
  await ensureDB();
  const data = await readFile(DB_FILE, 'utf8');
  return JSON.parse(data);
}

export async function saveDB(data) {
  await writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

export async function saveClientSession(clientId, session) {
  const db = await getDB();
  db.sessions[clientId] = session;
  await saveDB(db);
}

export async function getClientSession(clientId) {
  const db = await getDB();
  return db.sessions[clientId];
}