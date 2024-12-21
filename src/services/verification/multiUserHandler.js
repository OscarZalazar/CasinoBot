import { logger } from '../../utils/logger.js';
import { casinoManager } from '../casinoManager.js';

export class MultiUserHandler {
  // Extrae los nombres de usuario del nombre del contacto
  parseContactName(contactName) {
    if (!contactName) return [];
    // Dividir por '/' y limpiar cada nombre
    return contactName.split('/').map(name => name.trim()).filter(Boolean);
  }

  // Verifica si un usuario existe en el casino
  async verifyUserExists(username, casinoId) {
    try {
      const exists = await casinoManager.checkUserExists(casinoId, username);
      return exists;
    } catch (error) {
      logger.error('Error verificando existencia de usuario:', error);
      return false;
    }
  }

  // Genera el mensaje de selección de usuario
  generateUserSelectionMessage(users) {
    let message = '📋 Seleccione el usuario para la carga:\n\n';
    users.forEach((user, index) => {
      message += `${index + 1}. ${user}\n`;
    });
    message += '\n0. Escribir otro nombre de usuario';
    return message;
  }

  // Procesa la selección del usuario
  async processUserSelection(selection, availableUsers, customUsername = null) {
    try {
      if (selection === '0' && customUsername) {
        // Verificar si el usuario personalizado existe
        const exists = await this.verifyUserExists(customUsername);
        if (!exists) {
          return {
            success: false,
            message: '❌ El usuario ingresado no existe en el casino.'
          };
        }
        return {
          success: true,
          username: customUsername
        };
      }

      const index = parseInt(selection) - 1;
      if (index >= 0 && index < availableUsers.length) {
        return {
          success: true,
          username: availableUsers[index]
        };
      }

      return {
        success: false,
        message: '❌ Selección inválida. Por favor, elija una opción válida.'
      };
    } catch (error) {
      logger.error('Error procesando selección de usuario:', error);
      throw error;
    }
  }
}

export const multiUserHandler = new MultiUserHandler();