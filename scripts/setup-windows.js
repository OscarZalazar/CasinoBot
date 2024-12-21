import { execSync } from 'child_process';
import { log } from '../src/utils/logger.js';

async function setupWindows() {
  try {
    log('Configurando entorno para Windows...');
    
    // Instalar Chrome usando Puppeteer
    execSync('npx puppeteer browsers install chrome', { stdio: 'inherit' });
    
    log('Configuración completada correctamente');
  } catch (error) {
    log(`Error en la configuración: ${error.message}`, 'error');
    process.exit(1);
  }
}

setupWindows();