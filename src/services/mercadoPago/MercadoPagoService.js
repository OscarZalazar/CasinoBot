import MercadoPago from 'mercadopago';
import { MERCADOPAGO_CONFIG } from '../../config/providers.js';
import { logger } from '../../utils/logger.js';

class MercadoPagoService {
  constructor() {
    this.initialize();
  }

  initialize() {
    MercadoPago.configure({
      access_token: MERCADOPAGO_CONFIG.accessToken
    });
  }

  async createPayment(amount) {
    try {
      const payment = await MercadoPago.payment.create({
        transaction_amount: amount,
        payment_method_id: 'account_money',
        description: 'Carga de fichas',
        payer: {
          email: 'test@test.com'
        }
      });

      return payment;
    } catch (error) {
      logger.error('Error creating payment:', error);
      throw error;
    }
  }

  async verifyPayment(paymentId) {
    try {
      const payment = await MercadoPago.payment.findById(paymentId);
      return payment;
    } catch (error) {
      logger.error('Error verifying payment:', error);
      throw error;
    }
  }

  getPaymentInstructions() {
    return {
      cvu: MERCADOPAGO_CONFIG.cvu,
      alias: MERCADOPAGO_CONFIG.alias
    };
  }
}

export const mercadoPagoService = new MercadoPagoService();