import MercadoPago from 'mercadopago';
import { logger } from '../utils/logger.js';

export function setupMercadoPago() {
  if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
    throw new Error('MERCADOPAGO_ACCESS_TOKEN is required');
  }
  
  MercadoPago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
  });
}

export async function verifyPayment(operationId, expectedAmount) {
  try {
    logger.info(`Verifying payment ${operationId} for amount ${expectedAmount}`);
    
    const payment = await MercadoPago.payment.findById(operationId);
    
    if (!payment || !payment.response) {
      logger.error(`Payment ${operationId} not found`);
      return {
        verified: false,
        error: 'Pago no encontrado'
      };
    }

    const paymentData = payment.response;
    
    // Verificar estado del pago
    if (paymentData.status !== 'approved') {
      logger.error(`Payment ${operationId} not approved. Status: ${paymentData.status}`);
      return {
        verified: false,
        error: 'El pago no está aprobado'
      };
    }

    // Verificar monto
    const receivedAmount = paymentData.transaction_amount;
    if (receivedAmount !== expectedAmount) {
      logger.error(`Amount mismatch for payment ${operationId}. Expected: ${expectedAmount}, Received: ${receivedAmount}`);
      return {
        verified: false,
        error: 'El monto recibido no coincide con el monto seleccionado'
      };
    }

    logger.info(`Payment ${operationId} verified successfully`);
    return {
      verified: true,
      amount: receivedAmount,
      paymentData
    };
  } catch (error) {
    logger.error('Error verifying payment:', error);
    throw error;
  }
}