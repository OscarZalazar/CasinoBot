import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { casinoScrapingFactory } from '../services/scraping';

describe('Casino Scraping Service', () => {
  let scraper;

  beforeAll(async () => {
    scraper = await casinoScrapingFactory.getScraperForCasino({
      id: 'lucky',
      url: process.env.CASINO_API_URL,
      username: process.env.CASINO_USERNAME,
      password: process.env.CASINO_PASSWORD
    });
  });

  it('should load chips successfully', async () => {
    const result = await scraper.loadChips('testUser', 1000);
    expect(result).toBe(true);
  });

  afterAll(async () => {
    await casinoScrapingFactory.cleanup();
  });
});