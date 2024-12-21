import { MESSAGES, AMOUNTS } from '../config/constants.js';
import { verifyPayment } from '../services/mercadoPago.js';
import { loadChips } from '../services/casino.js';
import { logger } from '../utils/logger.js';
import { menuManager } from '../services/menu/MenuManager.js';
import { reportManager } from '../services/reports/ReportManager.js';
import { sessionManager } from '../services/session/SessionManager.js';
import { multiUserHandler } from '../services/verification/multiUserHandler.js';

export async function handleIncomingMessage(message) {
  try {
    const { from, body } = message;
    logger.info(`Mensaje recibido de ${from}: ${body}`);

    const session = await sessionManager.getSession(from);
    const contact = await message.getContact();

    // Si es el primer mensaje o mensaje de bienvenida
    if (!message.hasQuotedMsg) {
      const welcomeMessage = await menuManager.generateWelcomeMessage(contact);
      return message.reply(welcomeMessage);
    }

    // Manejar selección del menú principal
    if (body === '1') {
      const contactName = contact.pushname || '';
      const availableUsers = multiUserHandler.parseContactName(contactName);

      if (availableUsers.length > 0) {
        session.availableUsers = availableUsers;
        session.state = 'selecting_user';
        await sessionManager.saveSession(from, session);

        const userSelectionMessage = multiUserHandler.generateUserSelectionMessage(availableUsers);
        return message.reply(userSelectionMessage);
      }

      // Si no hay usuarios en el nombre, pedir directamente el nombre de usuario
      session.state = 'waiting_username';
      await sessionManager.saveSession(from, session);
      return message.reply('Por favor, escriba el nombre de usuario del casino:');
    }

    // Manejar selección de usuario
    if (session.state === 'selecting_user') {
      if (body === '0') {
        session.state = 'waiting_username';
        await sessionManager.saveSession(from, session);
        return message.reply('Por favor, escriba el nombre de usuario del casino:');
      }

      const selection = await multiUserHandler.processUserSelection(
        body, 
        session.availableUsers
      );

      if (!selection.success) {
        return message.reply(selection.message);
      }

      session.selectedUsername = selection.username;
      session.state = 'selecting_amount';
      await sessionManager.saveSession(from, session);

      const amountMenu = AMOUNTS.map((amount, index) => 
        `${index + 1}. $${amount.toLocaleString('es-AR')}`
      ).join('\n');
      
      return message.reply(MESSAGES.SELECT_AMOUNT + '\n\n' + amountMenu);
    }

    // Manejar entrada de nombre de usuario personalizado
    if (session.state === 'waiting_username') {
      const customUsername = body.trim();
      const selection = await multiUserHandler.processUserSelection(
        '0',
        [],
        customUsername
      );

      if (!selection.success) {
        return message.reply(selection.message);
      }

      session.selectedUsername = selection.username;
      session.state = 'selecting_amount';
      await sessionManager.saveSession(from, session);

      const amountMenu = AMOUNTS.map((amount, index) => 
        `${index + 1}. $${amount.toLocaleString('es-AR')}`
      ).join('\n');
      
      return message.reply(MESSAGES.SELECT_AMOUNT + '\n\n' + amountMenu);
    }

    // ... resto del código existente para manejar selección de monto y pago ...

  } catch (error) {
    logger.error('Error manejando mensaje:', error);
    message.reply(MESSAGES.ERROR);
  }
}