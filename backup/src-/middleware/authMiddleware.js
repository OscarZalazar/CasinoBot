import { verifyToken } from '../config/auth.js';
import { logger } from '../utils/logger.js';

export async function requireSuperAdmin(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = await verifyToken(token);
    if (!decoded || decoded.role !== 'super_admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
}