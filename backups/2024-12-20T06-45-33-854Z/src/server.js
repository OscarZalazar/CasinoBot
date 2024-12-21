import express from 'express';
import { logger } from './utils/logger.js';
import adminRoutes from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 3000;

export async function setupServer() {
  app.use(express.json());
  app.use(express.static('public'));
  
  // Rutas del panel de administración
  app.use('/api/admin', adminRoutes);
  
  app.listen(PORT, () => {
    logger.info(`Admin panel running on port ${PORT}`);
  });
}