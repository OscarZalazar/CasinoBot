import { User } from '../models/User.js';
import { AUTH_ROLES } from '../config/auth.js';
import { logger } from '../utils/logger.js';

class AdminManager {
  constructor() {
    this.superAdmin = null;
  }

  async initializeSuperAdmin(credentials) {
    try {
      if (this.superAdmin) {
        throw new Error('Super admin already exists');
      }

      this.superAdmin = await User.create({
        email: credentials.email,
        password: credentials.password,
        name: credentials.name,
        role: AUTH_ROLES.SUPER_ADMIN
      });

      logger.info('Super admin initialized successfully');
      return this.superAdmin.toJSON();
    } catch (error) {
      logger.error('Error initializing super admin:', error);
      throw error;
    }
  }

  async getSuperAdmin() {
    return this.superAdmin ? this.superAdmin.toJSON() : null;
  }

  async updateSuperAdmin(updates) {
    try {
      if (!this.superAdmin) {
        throw new Error('Super admin not initialized');
      }

      Object.assign(this.superAdmin, updates);
      this.superAdmin.updatedAt = new Date();

      logger.info('Super admin updated successfully');
      return this.superAdmin.toJSON();
    } catch (error) {
      logger.error('Error updating super admin:', error);
      throw error;
    }
  }
}

export const adminManager = new AdminManager();