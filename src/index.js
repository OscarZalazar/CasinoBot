import { log } from './utils/logger.js';
import { initWhatsApp } from './services/whatsapp.js';
import { closeBrowser } from './services/browser.js';

async function startBot() {
  try {
    log('Iniciando el bot...');
    const client = await initWhatsApp();
    await client.initialize();
  } catch (error) {
    log('Error al iniciar el bot: ' + error.message, 'error');
    await closeBrowser();
    process.exit(1);
  }
}

process.on('uncaughtException', async (err) => {
  log('Error no capturado: ' + err.message, 'error');
  await closeBrowser();
  process.exit(1);
});

startBot();