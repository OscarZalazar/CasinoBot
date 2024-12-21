import { CASINO_PROVIDERS } from '../../config/providers.js';
import { LuckyCasinoProvider } from '../../providers/lucky/LuckyCasinoProvider.js';
import { GaleraCasinoProvider } from '../../providers/galera/GaleraCasinoProvider.js';
import { GanaCasinoProvider } from '../../providers/gana/GanaCasinoProvider.js';
import { logger } from '../../utils/logger.js';

class CasinoProviderFactory {
  constructor() {
    this.providers = {
      LUCKY: () => new LuckyCasinoProvider(CASINO_PROVIDERS.LUCKY),
      GALERA: () => new GaleraCasinoProvider(CASINO_PROVIDERS.GALERA),
      GANA: () => new GanaCasinoProvider(CASINO_PROVIDERS.GANA)
    };
  }

  createProvider(providerType) {
    const provider = this.providers[providerType];
    
    if (!provider) {
      throw new Error(`Provider ${providerType} not supported`);
    }

    logger.info(`Creating casino provider: ${providerType}`);
    return provider();
  }
}

export const casinoProviderFactory = new CasinoProviderFactory();