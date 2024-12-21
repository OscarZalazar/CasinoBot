import puppeteer from 'puppeteer';
import { ICasinoProvider } from '../../interfaces/ICasinoProvider.js';
import { logger } from '../../utils/logger.js';

export class GanaCasinoProvider extends ICasinoProvider {
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
      logger.info('Gana en Casa provider initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize Gana en Casa provider:', error);
      throw error;
    }
  }

  async login() {
    try {
      await this.page.goto(this.config.url);
      await this.page.waitForSelector('#username');
      await this.page.waitForSelector('#password');
      
      await this.page.type('#username', this.config.username);
      await this.page.type('#password', this.config.password);
      
      await this.page.click('#login-button');
      await this.page.waitForNavigation();
      
      logger.info('Successfully logged into Gana en Casa panel');
      return true;
    } catch (error) {
      logger.error('Failed to login to Gana en Casa:', error);
      throw error;
    }
  }

  async loadChips(username, amount) {
    try {
      await this.ensureLoggedIn();
      await this.page.goto(`${this.config.url}/users/manage`);
      
      await this.page.type('#search-user', username);
      await this.page.click('#search-button');
      await this.page.waitForSelector('.user-row');
      
      await this.page.click('.add-credits');
      await this.page.type('#amount-input', amount.toString());
      await this.page.click('#confirm-credits');
      
      await this.page.waitForSelector('.success-notification');
      
      logger.info(`Successfully loaded ${amount} chips for user ${username} in Gana en Casa`);
      return true;
    } catch (error) {
      logger.error('Error loading chips in Gana en Casa:', error);
      throw error;
    }
  }

  async checkBalance(username) {
    try {
      await this.ensureLoggedIn();
      await this.page.goto(`${this.config.url}/users/manage`);
      
      await this.page.type('#search-user', username);
      await this.page.click('#search-button');
      const balanceElement = await this.page.waitForSelector('.credits-amount');
      const balance = await balanceElement.evaluate(el => el.textContent);
      
      return parseFloat(balance);
    } catch (error) {
      logger.error('Error checking balance in Gana en Casa:', error);
      throw error;
    }
  }

  async ensureLoggedIn() {
    try {
      const needsLogin = await this.page.evaluate(() => {
        return document.querySelector('#login-form') !== null;
      });
      
      if (needsLogin) {
        logger.info('Session expired, logging in again to Gana en Casa');
        await this.login();
      }
    } catch (error) {
      logger.error('Error checking Gana en Casa login status:', error);
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