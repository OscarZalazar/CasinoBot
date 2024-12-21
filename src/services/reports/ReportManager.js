import { logger } from '../../utils/logger.js';
import { formatCurrency } from '../../utils/formatters.js';

class ReportManager {
  constructor() {
    this.reports = new Map(); // Almacena reportes por instancia
  }

  // Registra una nueva interacción de chat
  logChat(instanceId, fromNumber) {
    this.initializeInstanceIfNeeded(instanceId);
    this.reports.get(instanceId).totalChats++;
    logger.info(`Chat logged for instance ${instanceId} from ${fromNumber}`);
  }

  // Registra una nueva carga de fichas
  logChipLoad(instanceId, amount) {
    this.initializeInstanceIfNeeded(instanceId);
    const report = this.reports.get(instanceId);
    report.totalTransfers++;
    report.totalAmount += amount;
    logger.info(`Chip load logged for instance ${instanceId}: ${amount}`);
  }

  // Genera el reporte para un número específico
  async generateReport(instanceId) {
    try {
      this.initializeInstanceIfNeeded(instanceId);
      const report = this.reports.get(instanceId);
      
      return `📊 *REPORTE DE ACTIVIDAD*\n\n` +
             `📱 Chats totales: ${report.totalChats}\n` +
             `💸 Transferencias realizadas: ${report.totalTransfers}\n` +
             `💰 Monto total: ${formatCurrency(report.totalAmount)}\n\n` +
             `📅 Reporte generado: ${new Date().toLocaleString()}\n`;
    } catch (error) {
      logger.error('Error generating report:', error);
      throw error;
    }
  }

  // Inicializa el reporte de una instancia si no existe
  private initializeInstanceIfNeeded(instanceId) {
    if (!this.reports.has(instanceId)) {
      this.reports.set(instanceId, {
        totalChats: 0,
        totalTransfers: 0,
        totalAmount: 0
      });
    }
  }

  // Obtiene las estadísticas para el panel de administración
  async getAdminStats(instanceId) {
    try {
      this.initializeInstanceIfNeeded(instanceId);
      return this.reports.get(instanceId);
    } catch (error) {
      logger.error('Error getting admin stats:', error);
      throw error;
    }
  }
}

export const reportManager = new ReportManager();