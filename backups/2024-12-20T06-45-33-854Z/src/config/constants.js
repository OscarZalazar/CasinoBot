export const AMOUNTS = [
  2000,
  3000,
  5000,
  10000,
  15000,
  20000,
  30000,
  40000,
  50000
];

export const WITHDRAWAL_LIMITS = {
  FAST: {
    amount: 50000,
    hours: 24
  },
  MEDIUM: {
    amount: 100000,
    hours: 48
  },
  SLOW: {
    amount: Infinity,
    hours: 72
  }
};

export const CASINO_ICONS = {
  lucky: '🍀',    // Trébol
  gana: '🏠',     // Casa
  galera: '🎩'    // Galera
};

export const CASINO_NAMES = {
  lucky: 'Lucky',
  gana: 'Gana en Casa',
  galera: 'Galera Verde'
};

export const MESSAGES = {
  WELCOME: (name) => `¡Hola ${name}! Bienvenido, ¿en qué te puedo servir?`,
  MAIN_MENU: `Selecciona una opción:
1️⃣ Quiero Cargar
2️⃣ Quiero crear mi usuario
3️⃣ Quiero Retirar`,
  SELECT_CASINO: 'Elegí en qué casino querés jugar:',
  SELECT_AMOUNT: 'Selecciona el monto a cargar:',
  ASK_NAME: 'Por favor, ingresa tu nombre para crear tu usuario:',
  CREATING_USER: 'Gracias. Un operador creará tu usuario y te contactará a la brevedad.',
  PAYMENT_INSTRUCTIONS: 'Por favor, realiza la transferencia al siguiente CVU/Alias:',
  PAYMENT_CONFIRMED: 'Pago confirmado. Procediendo a cargar las fichas...',
  CHIPS_LOADED: 'Fichas Cargadas!\nMucha Suerte =)',
  WITHDRAWAL_INSTRUCTIONS: (limits) => `Dime que cantidad quieres retirar y dime tu CVU/Alias de MERCADO PAGO.

Retiros únicamente por Mercado Pago

Hasta ${limits.FAST.amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} en ${limits.FAST.hours}Hs.
Hasta ${limits.MEDIUM.amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} en ${limits.MEDIUM.hours}Hs.
Mas de ${limits.MEDIUM.amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} en ${limits.SLOW.hours}Hs.`,
  ERROR: 'Ha ocurrido un error. Por favor, intenta nuevamente.'
};