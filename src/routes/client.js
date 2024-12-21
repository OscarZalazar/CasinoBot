import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { generateWhatsAppQR } from '../services/whatsapp.js';

const router = express.Router();

// Ruta para generar QR de WhatsApp
router.post('/whatsapp/connect', verifyToken, async (req, res) => {
  try {
    const { clientId } = req.user;
    const qrCode = await generateWhatsAppQR(clientId);
    res.json({ qrCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para verificar estado de conexión
router.get('/whatsapp/status', verifyToken, async (req, res) => {
  try {
    const { clientId } = req.user;
    const status = await getWhatsAppStatus(clientId);
    res.json({ status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;