import fs from 'fs/promises';
import { logger } from '../utils/logger.js';

const SETTINGS_FILE = 'settings.json';

const DEFAULT_SETTINGS = {
  whatsapp: {
    enabled: true,
    sessionData: null,
    adminNumber: '',
    autoReplyEnabled: true
  },
  mercadoPago: {
    accessToken: '',
    cvu: '',
    alias: ''
  },
  casino: {
    provider: 'lucky', // Puede ser 'lucky', 'galera' o 'gana'
    url: '',
    username: '',
    password: ''
  }
};

// ... resto del código igual ...