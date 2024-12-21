import puppeteer from 'puppeteer';
import { BROWSER_CONFIG } from '../config/browser.js';
import { log } from '../utils/logger.js';

let browser = null;

export async function initBrowser() {
  try {
    if (!browser) {
      browser = await puppeteer.launch(BROWSER_CONFIG.launch);
      log('Navegador iniciado correctamente');
    }
    return browser;
  } catch (error) {
    log(`Error iniciando navegador: ${error.message}`, 'error');
    throw error;
  }
}

export async function closeBrowser() {
  try {
    if (browser) {
      await browser.close();
      browser = null;
      log('Navegador cerrado correctamente');
    }
  } catch (error) {
    log(`Error cerrando navegador: ${error.message}`, 'error');
  }
}

// Cleanup on process exit
process.on('SIGINT', closeBrowser);
process.on('SIGTERM', closeBrowser);