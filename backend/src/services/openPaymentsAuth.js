const { createAuthenticatedClient } = require('@interledger/open-payments');

class OpenPaymentsAuth {
  constructor() {
    this.client = null;
    this.walletUrl =
      process.env.ILP_WALLET_URL || 'https://wallet.interledger-test.dev';
    this.privateKey = process.env.ILP_PRIVATE_KEY;
    this.keyId = process.env.ILP_KEY_ID;
  }

  async getClient() {
    if (this.client) {
      return this.client;
    }

    try {
      console.log('Inicializando cliente de Open Payments...');

      this.client = await createAuthenticatedClient({
        walletAddressUrl: this.walletUrl, // 👈 clave actualizada
        privateKey: this.privateKey,
        keyId: this.keyId
      });

      console.log('Cliente de Open Payments inicializado correctamente');
      return this.client;
    } catch (error) {
      console.error('Error inicializando cliente de Open Payments:', error);
      throw new Error('No se pudo inicializar el cliente de Open Payments');
    }
  }

  // Obtener información de la wallet (usando el módulo walletAddress del SDK)
  async getWalletInfo() {
    try {
      const client = await this.getClient();

      const wallet = await client.walletAddress.get({
        url: this.walletUrl
      });

      return {
        id: wallet.id,
        name: wallet.publicName || 'Sin nombre',
        assetCode: wallet.assetCode,
        assetScale: wallet.assetScale
      };
    } catch (error) {
      console.error('Error obteniendo información de la wallet:', error);
      throw error;
    }
  }

  // Listar pagos entrantes
  async listIncomingPayments(limit = 10) {
    try {
      const client = await this.getClient();

      const result = await client.incomingPayment.list({
        walletAddressUrl: this.walletUrl,
        limit
      });

      // El SDK devuelve un objeto con items y meta
      return result.items || [];
    } catch (error) {
      console.error('Error listando pagos entrantes:', error);
      throw error;
    }
  }

  // Método alternativo por si necesitas llamadas directas con axios
  async makeAuthenticatedRequest(path, method = 'GET') {
    try {
      const client = await this.getClient();

      const response = await client.axios.request({
        method,
        url: `${this.walletUrl}${path}`
      });

      return response.data;
    } catch (error) {
      console.error('Error en solicitud autenticada:', error);
      throw error;
    }
  }
}

module.exports = new OpenPaymentsAuth();
