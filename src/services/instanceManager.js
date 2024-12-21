import { settingsManager } from '../config/settings.js';
import { logger } from '../utils/logger.js';

class InstanceManager {
  async getAvailableCasinos(instanceId) {
    try {
      const instance = await this.getInstance(instanceId);
      return instance.enabledCasinos || [];
    } catch (error) {
      logger.error('Error getting available casinos:', error);
      throw error;
    }
  }

  async getInstance(instanceId) {
    try {
      // Aquí implementarías la lógica para obtener la configuración de la instancia
      // Por ahora retornamos datos de prueba
      return {
        id: instanceId,
        enabledCasinos: ['lucky', 'gana', 'galera']
      };
    } catch (error) {
      logger.error('Error getting instance:', error);
      throw error;
    }
  }
}

export const instanceManager = new InstanceManager();