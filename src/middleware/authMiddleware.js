import { verifyToken } from '../config/auth.js';
import { logger } from '../utils/logger.js';

export async function verifyClientToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const decoded = await verifyToken(token);
    if (!decoded || decoded.role !== 'client') {
      return res.status(403).json({ error: 'No autorizado' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Error en middleware de autenticación:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
}