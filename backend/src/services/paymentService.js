const openPaymentsAuth = require('./openPaymentsAuth');

class PaymentService {
  // Obtener información de la wallet (como en la documentación)
  async getWalletInfo() {
    try {
      return await openPaymentsAuth.getWalletInfo();
    } catch (error) {
      console.error('Error obteniendo información de la wallet:', error);
      throw error;
    }
  }

  // Listar pagos entrantes usando el enfoque correcto
  async listIncomingPayments(limit = 10) {
    try {
      return await openPaymentsAuth.listIncomingPayments(limit);
    } catch (error) {
      console.error('Error listando pagos entrantes:', error);
      throw error;
    }
  }

  // Obtener detalles de un pago específico
  async getIncomingPayment(paymentId) {
    try {
      const client = await openPaymentsAuth.getClient();
      const payment = await client.incomingPayment.get({
        id: paymentId,
        walletAddress: process.env.ILP_WALLET_URL || 'https://wallet.interledger-test.dev'
      });
      
      return payment;
    } catch (error) {
      console.error(`Error obteniendo pago entrante ${paymentId}:`, error);
      throw error;
    }
  }

  // Verificar el estado de un pago
  async verifyPayment(paymentId) {
    try {
      const payment = await this.getIncomingPayment(paymentId);
      
      return {
        payment,
        riskScore: this.calculateRiskScore(payment),
        explanation: this.generateExplanation(payment),
        status: "pending_analysis"
      };
    } catch (error) {
      console.error(`Error verificando pago ${paymentId}:`, error);
      throw error;
    }
  }

  // Métodos de placeholder para el análisis de riesgo
  calculateRiskScore(payment) {
    // Lógica simple de riesgo basada en el monto
    const amount = parseFloat(payment.amount.value);
    if (amount < 100) return 10;
    if (amount < 1000) return 30;
    if (amount < 5000) return 60;
    return 85;
  }

  generateExplanation(payment) {
    const amount = parseFloat(payment.amount.value);
    if (amount < 100) return "Pago de bajo riesgo: monto pequeño";
    if (amount < 1000) return "Pago de riesgo moderado";
    if (amount < 5000) return "Pago de riesgo elevado: monto considerable";
    return "Pago de alto riesgo: monto muy elevado";
  }
}

module.exports = new PaymentService();