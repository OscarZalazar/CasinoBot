import { MESSAGES, CASINO_ICONS, CASINO_NAMES } from '../../config/constants.js';
import { getAvailableCasinos } from '../instanceManager.js';
import { logger } from '../../utils/logger.js';

class MenuManager {
  async generateWelcomeMessage(contact) {
    const name = contact.pushname || 'Usuario';
    return MESSAGES.WELCOME(name) + '\n\n' + MESSAGES.MAIN_MENU;
  }

  async generateCasinoMenu(instanceId) {
    try {
      const availableCasinos = await getAvailableCasinos(instanceId);
      
      if (availableCasinos.length === 1) {
        // Si solo hay un casino, retornar null para pasar directamente al menú de montos
        return null;
      }

      let menu = MESSAGES.SELECT_CASINO + '\n\n';
      availableCasinos.forEach(casino => {
        menu += `${CASINO_ICONS[casino]} ${CASINO_NAMES[casino]}\n`;
      });

      return menu;
    } catch (error) {
      logger.error('Error generating casino menu:', error);
      throw error;
    }
  }

  isCasinoSelection(message) {
    return Object.values(CASINO_NAMES).some(name => 
      message.toLowerCase().includes(name.toLowerCase())
    );
  }

  getCasinoFromMessage(message) {
    for (const [key, name] of Object.entries(CASINO_NAMES)) {
      if (message.toLowerCase().includes(name.toLowerCase())) {
        return key;
      }
    }
    return null;
  }
}

export const menuManager = new MenuManager();