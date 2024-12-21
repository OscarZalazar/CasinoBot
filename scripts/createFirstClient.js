import { clientManager } from '../src/services/clientManager.js';
import { logger } from '../src/utils/logger.js';

const FIRST_CLIENT = {
  name: 'Oscar Zalazar',
  email: 'oscar.zalazar@gmail.com',
  password: 'NyanaAkira13#',
  whatsappNumber: '+5491112345678', // Reemplazar con el número real
  settings: {
    mercadoPago: {
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
      cvu: process.env.MP_CVU,
      alias: process.env.MP_ALIAS
    },
    casinos: [
      {
        id: 'lucky',
        name: 'Lucky Casino',
        url: process.env.CASINO_API_URL,
        username: process.env.CASINO_USERNAME,
        password: process.env.CASINO_PASSWORD
      },
      {
        id: 'galera',
        name: 'Galera Verde Casino',
        url: process.env.GALERA_API_URL,
        username: process.env.GALERA_USERNAME,
        password: process.env.GALERA_PASSWORD
      },
      {
        id: 'gana',
        name: 'Gana en Casa',
        url: process.env.GANA_API_URL,
        username: process.env.GANA_USERNAME,
        password: process.env.GANA_PASSWORD
      }
    ],
    messages: {
      welcome: '¡Hola! Bienvenido al servicio de carga de fichas. ¿En qué puedo ayudarte?',
      withdrawal: 'Por favor indica el monto a retirar y tu CVU/Alias de Mercado Pago.'
    }
  }
};

async function createFirstClient() {
  try {
    const client = await clientManager.createClient(FIRST_CLIENT);
    logger.info('Primer cliente creado exitosamente:', {
      id: client.id,
      name: client.name,
      email: client.email
    });
    return client;
  } catch (error) {
    logger.error('Error creando primer cliente:', error);
    throw error;
  }
}

createFirstClient();