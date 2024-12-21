import { adminManager } from '../services/adminManager.js';
import { logger } from '../utils/logger.js';

const SUPER_ADMIN_CREDENTIALS = {
  name: 'Oscar Zalazar',
  email: 'oscar.zalazar@gmail.com',
  username: 'OZD.Arg',
  password: 'NyanaAkira13#'
};

async function initializeSuperAdmin() {
  try {
    const superAdmin = await adminManager.initializeSuperAdmin(SUPER_ADMIN_CREDENTIALS);
    logger.info('Super admin initialized:', superAdmin.name);
    return superAdmin;
  } catch (error) {
    logger.error('Failed to initialize super admin:', error);
    throw error;
  }
}

initializeSuperAdmin();