import { logger } from '../../utils/logger.js';
import { casinoManager } from '../casinoManager.js';

export class UsernameVerificationService {
  async verifyUsername(contact, casinoUsername) {
    try {
      // Obtener el nombre del contacto de WhatsApp
      const whatsappName = contact.pushname || '';
      
      // Normalizar ambos nombres (eliminar espacios, convertir a minúsculas)
      const normalizedWhatsappName = this.normalizeName(whatsappName);
      const normalizedCasinoUsername = this.normalizeName(casinoUsername);

      // Verificar coincidencia exacta
      const isMatch = normalizedWhatsappName === normalizedCasinoUsername;

      logger.info('Verificación de nombre de usuario', {
        whatsappName: normalizedWhatsappName,
        casinoUsername: normalizedCasinoUsername,
        isMatch
      });

      return {
        isValid: isMatch,
        whatsappName: normalizedWhatsappName,
        casinoUsername: normalizedCasinoUsername
      };
    } catch (error) {
      logger.error('Error en verificación de nombre de usuario:', error);
      throw error;
    }
  }

  private normalizeName(name) {
    return name
      .toLowerCase()
      .replace(/\s+/g, '') // Eliminar espacios
      .replace(/[^a-z0-9]/g, ''); // Solo permitir letras y números
  }
}

export const usernameVerification = new UsernameVerificationService();