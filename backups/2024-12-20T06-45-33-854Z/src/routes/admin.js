import express from 'express';
import { settingsManager } from '../config/settings.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Middleware de autenticación básica
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Autenticación requerida' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  // IMPORTANTE: Cambiar estas credenciales en producción
  if (username === 'admin' && password === 'adminpass') {
    next();
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
};

// Obtener configuración actual
router.get('/settings', authenticate, async (req, res) => {
  try {
    const settings = settingsManager.get();
    // Ocultar información sensible
    const safeSettings = {
      ...settings,
      mercadoPago: {
        ...settings.mercadoPago,
        accessToken: settings.mercadoPago.accessToken ? '****' : ''
      },
      casino: {
        ...settings.casino,
        password: settings.casino.password ? '****' : ''
      }
    };
    res.json(safeSettings);
  } catch (error) {
    logger.error('Error getting settings:', error);
    res.status(500).json({ error: 'Error al obtener la configuración' });
  }
});

// Actualizar configuración
router.post('/settings', authenticate, async (req, res) => {
  try {
    const newSettings = req.body;
    await settingsManager.update(newSettings);
    res.json({ message: 'Configuración actualizada exitosamente' });
  } catch (error) {
    logger.error('Error updating settings:', error);
    res.status(500).json({ error: 'Error al actualizar la configuración' });
  }
});

export default router;