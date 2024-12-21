import { SharedPanelProvider } from '../shared/SharedPanelProvider.js';

export class GaleraCasinoProvider extends SharedPanelProvider {
  constructor(config) {
    super({
      ...config,
      casinoName: 'Galera Verde Casino'
    });
  }
}