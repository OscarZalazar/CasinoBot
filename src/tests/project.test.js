import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { casinoManager } from '../services/casinoManager';
import { whatsAppManager } from '../services/whatsapp/WhatsAppManager';
import { mercadoPagoService } from '../services/mercadoPago/MercadoPagoService';
import { clientManager } from '../services/clientManager';
import { adminManager } from '../services/adminManager';

describe('Project Integration Tests', () => {
  describe('Casino Integration', () => {
    it('should initialize casino providers', async () => {
      const providers = casinoManager.getAvailableProviders();
      expect(providers).toContain('lucky');
      expect(providers).toContain('galera');
      expect(providers).toContain('gana');
    });
  });

  describe('WhatsApp Integration', () => {
    it('should manage WhatsApp clients', async () => {
      const clientId = 'test-client';
      const status = await whatsAppManager.getClientStatus(clientId);
      expect(status).toHaveProperty('status');
    });
  });

  describe('MercadoPago Integration', () => {
    it('should provide payment instructions', () => {
      const instructions = mercadoPagoService.getPaymentInstructions();
      expect(instructions).toHaveProperty('cvu');
      expect(instructions).toHaveProperty('alias');
    });
  });

  describe('Client Management', () => {
    it('should create and manage clients', async () => {
      const clientData = {
        name: 'Test Client',
        email: 'test@example.com',
        whatsappNumber: '+1234567890',
        password: 'testpass123'
      };
      
      const client = await clientManager.createClient(clientData);
      expect(client).toHaveProperty('id');
      expect(client.name).toBe(clientData.name);
    });
  });

  describe('Admin Management', () => {
    it('should initialize super admin', async () => {
      const superAdmin = await adminManager.getSuperAdmin();
      expect(superAdmin).toBeTruthy();
      expect(superAdmin.role).toBe('super_admin');
    });
  });
});