import { config } from 'dotenv';
import { logger } from '../utils/logger.js';
import { encrypt } from '../utils/encryption.js';

export async function initializeSystem() {
  try {
    // Cargar variables de entorno
    config();

    // Verificar variables requeridas
    const requiredEnvVars = [
      'MERCADOPAGO_ACCESS_TOKEN',
      'MP_CVU',
      'MP_ALIAS',
      'CASINO_API_URL',
      'CASINO_USERNAME',
      'CASINO_PASSWORD',
      'ENCRYPTION_KEY',
      'JWT_SECRET'
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    if (missingVars.length > 0) {
      throw new Error(`Faltan variables de entorno requeridas: ${missingVars.join(', ')}`);
    }

    // Encriptar credenciales sensibles
    const encryptedCredentials = {
      mercadoPago: encrypt(process.env.MERCADOPAGO_ACCESS_TOKEN),
      casino: {
        lucky: encrypt(JSON.stringify({
          url: process.env.CASINO_API_URL,
          username: process.env.CASINO_USERNAME,
          password: process.env.CASINO_PASSWORD
        }))
      }
    };

    logger.info('Sistema inicializado correctamente');
    return encryptedCredentials;
  } catch (error) {
    logger.error('Error inicializando el sistema:', error);
    throw error;
  }
}