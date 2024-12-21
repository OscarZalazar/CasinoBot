import { MESSAGES, AMOUNTS } from '../config/constants.js';
import { verifyPayment } from '../services/mercadoPago.js';
import { loadChips } from '../services/casino.js';
import { logger } from '../utils/logger.js';
import { menuManager } from '../services/menu/MenuManager.js';
import { reportManager } from '../services/reports/ReportManager.js';
import { sessionManager } from '../services/session/SessionManager.js';

export async function handleIncomingMessage(message) {
  try {
    const { from, body } = message;
    logger.info(`Received message from ${from}: ${body}`);

    // Obtener o crear sesión del usuario
    const session = await sessionManager.getSession(from);

    // Si es el primer mensaje o mensaje de bienvenida
    if (!message.hasQuotedMsg) {
      const welcomeMessage = await menuManager.generateWelcomeMessage(message.getContact());
      return message.reply(welcomeMessage);
    }

    // Manejar selección del menú principal
    if (body === '1') {
      session.selectedOption = '1';
      session.state = 'selecting_amount';
      await sessionManager.saveSession(from, session);
      
      const amountMenu = AMOUNTS.map((amount, index) => 
        `${index + 1}. $${amount.toLocaleString('es-AR')}`
      ).join('\n');
      
      return message.reply(MESSAGES.SELECT_AMOUNT + '\n\n' + amountMenu);
    }

    if (body === '2') {
      session.selectedOption = '2';
      await sessionManager.saveSession(from, session);
      return message.reply(MESSAGES.ASK_NAME);
    }

    if (body === '3') {
      session.selectedOption = '3';
      await sessionManager.saveSession(from, session);
      return message.reply(MESSAGES.WITHDRAWAL_INSTRUCTIONS(WITHDRAWAL_LIMITS));
    }

    // Manejar selección de monto
    if (session.state === 'selecting_amount') {
      const selectedIndex = parseInt(body) - 1;
      if (selectedIndex >= 0 && selectedIndex < AMOUNTS.length) {
        const selectedAmount = AMOUNTS[selectedIndex];
        session.selectedAmount = selectedAmount;
        session.state = 'waiting_payment';
        await sessionManager.saveSession(from, session);
        
        return message.reply(
          `Has seleccionado $${selectedAmount.toLocaleString('es-AR')}\n\n` +
          MESSAGES.PAYMENT_INSTRUCTIONS + '\n' +
          `CVU: ${process.env.MP_CVU}\n` +
          `Alias: ${process.env.MP_ALIAS}\n\n` +
          'Una vez realizado el pago, envía el ID de la operación.'
        );
      }
    }

    // Verificar pago cuando el usuario envía el ID de operación
    if (session.state === 'waiting_payment' && session.selectedAmount) {
      const operationId = body.trim();
      
      // Verificar el pago y el monto
      const paymentVerification = await verifyPayment(operationId, session.selectedAmount);
      
      if (!paymentVerification.verified) {
        return message.reply(`❌ Error: ${paymentVerification.error}`);
      }

      // Si el pago es válido, cargar las fichas
      await loadChips(from, session.selectedAmount);
      
      // Registrar la transacción
      await reportManager.logChipLoad(session.instanceId, session.selectedAmount);
      
      // Limpiar la sesión
      await sessionManager.clearSession(from);
      
      return message.reply(MESSAGES.CHIPS_LOADED);
    }

    // Resto de la lógica de manejo de mensajes...
    
  } catch (error) {
    logger.error('Error handling message:', error);
    message.reply(MESSAGES.ERROR);
  }
}