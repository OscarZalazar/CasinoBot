import { describe, it, expect } from 'vitest';
import express from 'express';
import request from 'supertest';
import authRoutes from '../routes/auth';
import clientRoutes from '../routes/client';
import adminRoutes from '../routes/admin';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/admin', adminRoutes);

describe('API Endpoints', () => {
  describe('Auth Routes', () => {
    it('should handle login requests', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'test',
          password: 'test123'
        });
      
      expect(response.status).toBe(401);
    });
  });

  describe('Client Routes', () => {
    it('should require authentication', async () => {
      const response = await request(app)
        .get('/api/client/settings');
      
      expect(response.status).toBe(401);
    });
  });

  describe('Admin Routes', () => {
    it('should protect admin endpoints', async () => {
      const response = await request(app)
        .get('/api/admin/settings');
      
      expect(response.status).toBe(401);
    });
  });
});