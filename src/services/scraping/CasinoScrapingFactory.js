import { CasinoScrapingService } from './CasinoScrapingService.js';
import { logger } from '../../utils/logger.js';

class CasinoScrapingFactory {
  constructor() {
    this.scrapers = new Map();
  }

  async getScraperForCasino(casinoConfig) {
    const { id } = casinoConfig;

    if (!this.scrapers.has(id)) {
      logger.info(`Creating new scraper for casino ${id}`);
      const scraper = new CasinoScrapingService(casinoConfig);
      await scraper.initialize();
      this.scrapers.set(id, scraper);
    }

    return this.scrapers.get(id);
  }

  async cleanup() {
    for (const scraper of this.scrapers.values()) {
      await scraper.cleanup();
    }
    this.scrapers.clear();
  }
}

export const casinoScrapingFactory = new CasinoScrapingFactory();