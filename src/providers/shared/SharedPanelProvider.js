import { withRetry } from '../../utils/retry.js';

// ... resto del código ...

async login() {
  return withRetry(async () => {
    await this.page.goto(this.config.url, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    await this.page.waitForSelector('input[type="text"]');
    await this.page.waitForSelector('input[type="password"]');
    
    await this.page.type('input[type="text"]', this.config.username);
    await this.page.type('input[type="password"]', this.config.password);
    
    await Promise.all([
      this.page.click('button[type="submit"]'),
      this.page.waitForNavigation({ waitUntil: 'networkidle0' })
    ]);
    
    logger.info(`Successfully logged into ${this.config.casinoName} panel`);
    return true;
  });
}