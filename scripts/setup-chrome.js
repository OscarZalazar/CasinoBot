import { execSync } from 'child_process';
import { log } from '../src/utils/logger.js';
import { checkSystemDependencies } from '../src/utils/system.js';

async function setupChrome() {
  try {
    log('Iniciando instalación de Chrome...');

    // Verificar dependencias del sistema
    if (!checkSystemDependencies()) {
      log('Instalando dependencias del sistema...');
      execSync('apt-get update && apt-get install -y ' + [
        'libx11-xcb1',
        'libxcomposite1', 
        'libxdamage1',
        'libxext6',
        'libxfixes3',
        'libxrandr2',
        'libgbm1',
        'libasound2',
        'libatk1.0-0',
        'libgtk-3-0',
        'wget',
        'ca-certificates'
      ].join(' '), { stdio: 'inherit' });
    }

    // Instalar Chromium en lugar de Chrome
    log('Instalando Chromium...');
    execSync('apt-get install -y chromium chromium-l10n', { stdio: 'inherit' });

    // Configurar variable de entorno
    process.env.CHROME_PATH = '/usr/bin/chromium';
    
    log('Chromium instalado correctamente');
  } catch (error) {
    log(`Error en la instalación: ${error.message}`, 'error');
    process.exit(1);
  }
}

setupChrome();