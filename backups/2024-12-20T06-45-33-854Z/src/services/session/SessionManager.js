import { logger } from '../../utils/logger.js';

class SessionManager {
  constructor() {
    this.sessions = new Map();
  }

  async getSession(userId) {
    if (!this.sessions.has(userId)) {
      this.sessions.set(userId, {
        selectedOption: null,
        selectedAmount: null,
        state: 'initial',
        instanceId: null
      });
    }
    return this.sessions.get(userId);
  }

  async saveSession(userId, sessionData) {
    this.sessions.set(userId, sessionData);
    logger.info(`Session saved for user ${userId}`);
  }

  async clearSession(userId) {
    this.sessions.delete(userId);
    logger.info(`Session cleared for user ${userId}`);
  }
}

export const sessionManager = new SessionManager();