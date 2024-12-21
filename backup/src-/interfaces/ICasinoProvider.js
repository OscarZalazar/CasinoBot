export class ICasinoProvider {
  /**
   * Inicializa el proveedor del casino
   */
  async initialize() {
    throw new Error('Method not implemented');
  }

  /**
   * Realiza el login en el casino
   */
  async login() {
    throw new Error('Method not implemented');
  }

  /**
   * Carga fichas a un usuario
   */
  async loadChips(username, amount) {
    throw new Error('Method not implemented');
  }

  /**
   * Verifica el saldo de un usuario
   */
  async checkBalance(username) {
    throw new Error('Method not implemented');
  }

  /**
   * Limpia los recursos del proveedor
   */
  async cleanup() {
    throw new Error('Method not implemented');
  }
}