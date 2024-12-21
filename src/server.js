import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { join } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import clientRoutes from './routes/client.js';
import adminRoutes from './routes/admin.js';
import whatsappRoutes from './routes/whatsapp.js';
import { log } from './utils/logger.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static(join(__dirname, '../public')));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/whatsapp', whatsappRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  log(`Error: ${err.message}`, 'error');
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  log(`Server running on port ${PORT}`);
});