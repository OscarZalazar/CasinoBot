import puppeteer from 'puppeteer';
import { ICasinoProvider } from '../../interfaces/ICasinoProvider.js';
import { logger } from '../../utils/logger.js';

export class Casino1Provider extends ICasinoProvider {
  constructor(config) {
    super();
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
      logger.info('Casino1 provider initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize Casino1 provider:', error);
      throw error;
    }
  }

  async login() {
    try {
      await this.page.goto(this.config.url);
      await this.page.waitForSelector('input[type="text"]');
      await this.page.waitForSelector('input[type="password"]');
      
      await this.page.type('input[type="text"]', this.config.username);
      await this.page.type('input[type="password"]', this.config.password);
      
      await this.page.click('button[type="submit"]');
      await this.page.waitForNavigation();
      
      logger.info('Successfully logged into Casino1 panel');
      return true;
    } catch (error) {
      logger.error('Failed to login to Casino1:', error);
      throw error;
    }
  }

  async loadChips(username, amount) {
    try {
      await this.ensureLoggedIn();
      await this.page.goto(`${this.config.url}/admin/users`);
      
      await this.page.type('input[type="search"]', username);
      await this.page.waitForSelector(`td:contains("${username}")`);
      
      await this.page.click('button.load-chips');
      await this.page.type('input[type="number"]', amount.toString());
      await this.page.click('button.confirm-load');
      
      await this.page.waitForSelector('.success-message');
      
      logger.info(`Successfully loaded ${amount} chips for user ${username} in Casino1`);
      return true;
    } catch (error) {
      logger.error('Error loading chips in Casino1:', error);
      throw error;
    }
  }

  async checkBalance(username) {
    // Implementar según el casino específico
    throw new Error('Method not implemented');
  }

  async ensureLoggedIn() {
    try {
      const needsLogin = await this.page.evaluate(() => {
        return document.querySelector('login-form') !== null;
      });
      
      if (needsLogin) {
        logger.info('Session expired, logging in again to Casino1');
        await this.login();
      }
    } catch (error) {
      logger.error('Error checking Casino1 login status:', error);
      throw error;
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