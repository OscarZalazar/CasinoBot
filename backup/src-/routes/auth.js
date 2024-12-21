import express from 'express';
import { generateToken, comparePasswords } from '../config/auth.js';
import { adminManager } from '../services/adminManager.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const superAdmin = await adminManager.getSuperAdmin();

    if (!superAdmin || username !== superAdmin.username) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await comparePasswords(password, superAdmin.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = await generateToken(superAdmin);
    res.json({ token, user: superAdmin.toJSON() });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});