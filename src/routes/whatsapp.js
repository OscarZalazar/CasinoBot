import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { whatsAppManager } from '../services/whatsapp/WhatsAppManager.js';
import { log } from '../utils/logger.js';

const router = express.Router();

// Iniciar conexión de WhatsApp
router.post('/connect', verifyToken, async (req, res) => {
  try {
    const { clientId } = req.user;
    await whatsAppManager.initializeClient(clientId);
    
    // Esperar un momento para que se genere el QR
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const status = await whatsAppManager.getClientStatus(clientId);
    res.json(status);
  } catch (error) {
    log(`Error connecting WhatsApp: ${error.message}`, 'error');
    res.status(500).json({ error: 'Error connecting WhatsApp' });
  }
});

// Obtener estado de conexión
router.get('/status', verifyToken, async (req, res) => {
  try {
    const { clientId } = req.user;
    const status = await whatsAppManager.getClientStatus(clientId);
    res.json(status);
  } catch (error) {
    log(`Error getting WhatsApp status: ${error.message}`, 'error');
    res.status(500).json({ error: 'Error getting status' });
  }
});

// Desconectar WhatsApp
router.post('/disconnect', verifyToken, async (req, res) => {
  try {
    const { clientId } = req.user;
    await whatsAppManager.disconnectClient(clientId);
    res.json({ message: 'WhatsApp disconnected successfully' });
  } catch (error) {
    log(`Error disconnecting WhatsApp: ${error.message}`, 'error');
    res.status(500).json({ error: 'Error disconnecting WhatsApp' });
  }
});

export default router;