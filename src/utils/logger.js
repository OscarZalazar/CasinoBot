import fs from 'fs';

// Asegurar que existe el directorio de logs
const logsDir = './logs';
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

export function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${type.toUpperCase()}] ${message}\n`;
  
  // Escribir en archivo
  fs.appendFileSync(`${logsDir}/bot.log`, logMessage);
  
  // Mostrar en consola
  console.log(logMessage);
}