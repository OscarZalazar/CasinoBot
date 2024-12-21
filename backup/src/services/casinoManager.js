import { LuckyCasinoProvider } from '../providers/lucky/LuckyCasinoProvider.js';
import { GaleraCasinoProvider } from '../providers/galera/GaleraCasinoProvider.js';
import { GanaCasinoProvider } from '../providers/gana/GanaCasinoProvider.js';
import { logger } from '../utils/logger.js';

class CasinoManager {
  constructor() {
    this.provider = null;
    this.providers = {
      'lucky': LuckyCasinoProvider,
      'galera': GaleraCasinoProvider,
      'gana': GanaCasinoProvider
    };
  }

  async initializeProvider(providerName, config) {
    try {
      if (!this.providers[providerName]) {
        throw new Error(`Provider ${providerName} not found`);
      }

      if (this.provider) {
        await this.provider.cleanup();
      }

      const ProviderClass = this.providers[providerName];
      this.provider = new ProviderClass(config);
      await this.provider.initialize();

      logger.info(`Casino provider ${providerName} initialized successfully`);
    } catch (error) {
      logger.error(`Failed to initialize casino provider ${providerName}:`, error);
      throw error;
    }
  }

  async loadChips(username, amount) {
    if (!this.provider) {
      throw new Error('No casino provider initialized');
    }
    return this.provider.loadChips(username, amount);
  }

  async checkBalance(username) {
    if (!this.provider) {
      throw new Error('No casino provider initialized');
    }
    return this.provider.checkBalance(username);
  }

  async cleanup() {
    if (this.provider) {
      await this.provider.cleanup();
      this.provider = null;
    }
  }

  getAvailableProviders() {
    return Object.keys(this.providers);
  }
}

export const casinoManager = new CasinoManager();