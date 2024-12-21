import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Cambiar en producción

export const AUTH_ROLES = {
  SUPER_ADMIN: 'super_admin',
  CLIENT: 'client'
};

export async function generateToken(user) {
  return jwt.sign(
    { 
      id: user.id, 
      role: user.role,
      email: user.email 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export async function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    logger.error('Error verifying token:', error);
    return null;
  }
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function comparePasswords(password, hash) {
  return bcrypt.compare(password, hash);
}