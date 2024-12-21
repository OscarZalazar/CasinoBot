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
2️⃣ Quiero crear mi usuario`,
  SELECT_CASINO: 'Elegí en qué casino querés jugar:',
  SELECT_AMOUNT: 'Selecciona el monto a cargar:',
  ASK_NAME: 'Por favor, ingresa tu nombre para crear tu usuario:',
  CREATING_USER: 'Gracias. Un operador creará tu usuario y te contactará a la brevedad.',
  PAYMENT_INSTRUCTIONS: 'Por favor, realiza la transferencia al siguiente CVU/Alias:',
  PAYMENT_CONFIRMED: 'Pago confirmado. Procediendo a cargar las fichas...',
  CHIPS_LOADED: 'Fichas Cargadas!\nMucha Suerte =)',
  ERROR: 'Ha ocurrido un error. Por favor, intenta nuevamente.'
};