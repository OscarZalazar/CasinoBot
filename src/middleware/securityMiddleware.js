import { verifyToken } from '../config/auth.js';
import { sanitizeInput } from '../config/security.js';
import { logger } from '../utils/logger.js';

// Middleware para validar y sanitizar todas las entradas
export function sanitizeMiddleware(req, res, next) {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeInput(req.body[key]);
      }
    });
  }
  next();
}

// Middleware para verificar sesiones
export async function sessionGuard(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Acceso no autorizado' });
    }

    const session = await verifyToken(token);
    if (!session) {
      return res.status(403).json({ error: 'Sesión inválida o expirada' });
    }

    // Verificar IP y User Agent para prevenir robo de sesión
    const clientIp = req.ip;
    const userAgent = req.headers['user-agent'];
    
    if (session.ip !== clientIp || session.userAgent !== userAgent) {
      logger.warn('Intento de acceso con sesión robada', {
        sessionIp: session.ip,
        clientIp,
        sessionUA: session.userAgent,
        clientUA: userAgent
      });
      return res.status(403).json({ error: 'Sesión inválida' });
    }

    req.user = session;
    next();
  } catch (error) {
    logger.error('Error en verificación de sesión:', error);
    res.status(401).json({ error: 'Error de autenticación' });
  }
}

// Middleware para prevenir ataques de fuerza bruta
export const bruteForceProtection = {
  failedAttempts: new Map(),
  maxAttempts: 3,
  blockDuration: 30 * 60 * 1000, // 30 minutos

  check(req, res, next) {
    const clientIp = req.ip;
    const attempts = this.failedAttempts.get(clientIp);

    if (attempts && attempts.count >= this.maxAttempts) {
      const timeLeft = attempts.timestamp + this.blockDuration - Date.now();
      if (timeLeft > 0) {
        return res.status(429).json({
          error: 'Demasiados intentos fallidos. Cuenta bloqueada temporalmente.',
          timeLeft: Math.ceil(timeLeft / 1000)
        });
      }
      this.failedAttempts.delete(clientIp);
    }
    next();
  },

  recordFailedAttempt(ip) {
    const attempts = this.failedAttempts.get(ip) || { count: 0, timestamp: Date.now() };
    attempts.count++;
    attempts.timestamp = Date.now();
    this.failedAttempts.set(ip, attempts);
  }
};