import puppeteer from 'puppeteer';
import { logger } from '../utils/logger.js';

let browser = null;
let page = null;

export async function initializeCasino() {
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    
    // Login inicial al casino
    await loginToCasino();
    logger.info('Casino service initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize casino service:', error);
    throw error;
  }
}

async function loginToCasino() {
  try {
    await page.goto(process.env.CASINO_URL);
    
    // Esperar a que aparezca el formulario de login
    await page.waitForSelector('input[type="text"]'); // Ajustar según el selector real
    await page.waitForSelector('input[type="password"]');
    
    // Ingresar credenciales
    await page.type('input[type="text"]', process.env.CASINO_USERNAME);
    await page.type('input[type="password"]', process.env.CASINO_PASSWORD);
    
    // Click en el botón de login
    await page.click('button[type="submit"]'); // Ajustar según el selector real
    
    // Esperar a que se complete el login
    await page.waitForNavigation();
    
    logger.info('Successfully logged into casino panel');
  } catch (error) {
    logger.error('Failed to login to casino:', error);
    throw error;
  }
}

export async function loadChips(username, amount) {
  try {
    // Verificar si necesitamos hacer login nuevamente
    await ensureLoggedIn();
    
    // Navegar a la página de carga de fichas
    await page.goto(`${process.env.CASINO_URL}/admin/users`); // Ajustar según la URL real
    
    // Buscar al usuario
    await page.type('input[type="search"]', username); // Ajustar según el selector real
    
    // Esperar a que aparezca el resultado
    await page.waitForSelector(`td:contains("${username}")`);
    
    // Click en el botón de cargar fichas
    await page.click('button.load-chips'); // Ajustar según el selector real
    
    // Ingresar el monto
    await page.type('input[type="number"]', amount.toString());
    
    // Confirmar la carga
    await page.click('button.confirm-load'); // Ajustar según el selector real
    
    // Esperar confirmación
    await page.waitForSelector('.success-message'); // Ajustar según el selector real
    
    logger.info(`Successfully loaded ${amount} chips for user ${username}`);
    return true;
  } catch (error) {
    logger.error('Error loading chips:', error);
    throw error;
  }
}

async function ensureLoggedIn() {
  try {
    // Verificar si estamos en una página que requiere login
    const needsLogin = await page.evaluate(() => {
      // Ajustar según cómo se puede detectar si estamos logueados
      return document.querySelector('login-form') !== null;
    });
    
    if (needsLogin) {
      logger.info('Session expired, logging in again');
      await loginToCasino();
    }
  } catch (error) {
    logger.error('Error checking login status:', error);
    throw error;
  }
}

// Limpiar recursos al cerrar la aplicación
export async function cleanupCasino() {
  if (browser) {
    await browser.close();
    browser = null;
    page = null;
  }
}