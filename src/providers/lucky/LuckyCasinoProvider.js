import { SharedPanelProvider } from '../shared/SharedPanelProvider.js';

export class LuckyCasinoProvider extends SharedPanelProvider {
  constructor(config) {
    super({
      ...config,
      casinoName: 'Lucky Casino'
    });
  }
}