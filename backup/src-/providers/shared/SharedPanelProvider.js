import puppeteer from 'puppeteer';
import { ICasinoProvider } from '../../interfaces/ICasinoProvider.js';
import { logger } from '../../utils/logger.js';

export class SharedPanelProvider extends ICasinoProvider {
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
      logger.info(`${this.config.casinoName} provider initialized successfully`);
    } catch (error) {
      logger.error(`Failed to initialize ${this.config.casinoName} provider:`, error);
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
      
      logger.info(`Successfully logged into ${this.config.casinoName} panel`);
      return true;
    } catch (error) {
      logger.error(`Failed to login to ${this.config.casinoName}:`, error);
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
      
      logger.info(`Successfully loaded ${amount} chips for user ${username} in ${this.config.casinoName}`);
      return true;
    } catch (error) {
      logger.error(`Error loading chips in ${this.config.casinoName}:`, error);
      throw error;
    }
  }

  async checkBalance(username) {
    try {
      await this.ensureLoggedIn();
      await this.page.goto(`${this.config.url}/admin/users`);
      
      await this.page.type('input[type="search"]', username);
      const balanceElement = await this.page.waitForSelector('.user-balance');
      const balance = await balanceElement.evaluate(el => el.textContent);
      
      return parseFloat(balance);
    } catch (error) {
      logger.error(`Error checking balance in ${this.config.casinoName}:`, error);
      throw error;
    }
  }

  async ensureLoggedIn() {
    try {
      const needsLogin = await this.page.evaluate(() => {
        return document.querySelector('login-form') !== null;
      });
      
      if (needsLogin) {
        logger.info(`Session expired, logging in again to ${this.config.casinoName}`);
        await this.login();
      }
    } catch (error) {
      logger.error(`Error checking ${this.config.casinoName} login status:`, error);
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