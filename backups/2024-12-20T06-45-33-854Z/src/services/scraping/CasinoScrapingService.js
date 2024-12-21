import puppeteer from 'puppeteer';
import { logger } from '../../utils/logger.js';
import { withRetry } from '../../utils/retry.js';

export class CasinoScrapingService {
  constructor(config) {
    this.config = config;
    this.browser = null;
    this.page = null;
  }

  async initialize() {
    try {
      this.browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      this.page = await this.browser.newPage();
      await this.login();
    } catch (error) {
      logger.error('Error initializing casino scraping:', error);
      throw error;
    }
  }

  async login() {
    return withRetry(async () => {
      await this.page.goto(this.config.url, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Esperar y llenar credenciales
      await this.page.waitForSelector('input[type="text"]');
      await this.page.waitForSelector('input[type="password"]');
      
      await this.page.type('input[type="text"]', this.config.username);
      await this.page.type('input[type="password"]', this.config.password);
      
      // Click en login y esperar navegación
      await Promise.all([
        this.page.click('button[type="submit"]'),
        this.page.waitForNavigation({ waitUntil: 'networkidle0' })
      ]);

      logger.info('Login successful');
    });
  }

  async loadChips(username, amount) {
    return withRetry(async () => {
      await this.ensureLoggedIn();
      
      // Navegar a la página de usuarios
      await this.page.goto(`${this.config.url}/admin/users`);
      
      // Buscar usuario
      await this.page.type('input[type="search"]', username);
      await this.page.waitForSelector(`td:contains("${username}")`);
      
      // Proceso de carga
      await this.page.click('button.load-chips');
      await this.page.type('input[type="number"]', amount.toString());
      await this.page.click('button.confirm-load');
      
      // Esperar confirmación
      await this.page.waitForSelector('.success-message');
      
      logger.info(`Successfully loaded ${amount} chips for user ${username}`);
      return true;
    });
  }

  async ensureLoggedIn() {
    const needsLogin = await this.page.evaluate(() => {
      return document.querySelector('login-form') !== null;
    });
    
    if (needsLogin) {
      logger.info('Session expired, logging in again');
      await this.login();
    }
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }
}