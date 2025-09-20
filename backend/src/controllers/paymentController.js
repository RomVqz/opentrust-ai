const paymentService = require('../services/paymentService');

const paymentController = {
  // Obtener lista de pagos entrantes
  async getIncomingPayments(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const payments = await paymentService.listIncomingPayments(limit);
      
      res.json({
        success: true,
        data: payments,
        message: 'Pagos entrantes obtenidos correctamente'
      });
    } catch (error) {
      console.error('Error en getIncomingPayments:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener pagos entrantes',
        error: error.message
      });
    }
  },

  // Obtener detalles de un pago específico
  async getPaymentDetails(req, res) {
    try {
      const { paymentId } = req.params;
      const payment = await paymentService.getIncomingPayment(paymentId);
      
      res.json({
        success: true,
        data: payment,
        message: 'Detalles de pago obtenidos correctamente'
      });
    } catch (error) {
      console.error('Error en getPaymentDetails:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener detalles del pago',
        error: error.message
      });
    }
  },

  // Verificar un pago (integración con motor de riesgo)
  async verifyPayment(req, res) {
    try {
      const { paymentId } = req.params;
      const verificationResult = await paymentService.verifyPayment(paymentId);
      
      res.json({
        success: true,
        data: verificationResult,
        message: 'Pago verificado correctamente'
      });
    } catch (error) {
      console.error('Error en verifyPayment:', error);
      res.status(500).json({
        success: false,
        message: 'Error al verificar el pago',
        error: error.message
      });
    }
  },
  // Analizar un pago recibido (POST /api/analyze)
  async analyzePayment(req, res) {
    try {
      const paymentData = req.body;
      const RiskService = require('../services/riskService');
      const riskService = new RiskService();
      const analysis = riskService.analyzePayment(paymentData);
      res.json({
        success: true,
        data: analysis,
        message: 'Análisis de pago realizado correctamente'
      });
    } catch (error) {
      console.error('Error en analyzePayment:', error);
      res.status(500).json({
        success: false,
        message: 'Error al analizar el pago',
        error: error.message
      });
    }
  },

  // Obtener todas las transacciones (GET /api/transactions)
  async getTransactions(req, res) {
    try {
      const transactions = await paymentService.listIncomingPayments(50);
      res.json({
        success: true,
        data: transactions,
        message: 'Transacciones obtenidas correctamente'
      });
    } catch (error) {
      console.error('Error en getTransactions:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener transacciones',
        error: error.message
      });
    }
  }
};

module.exports = paymentController;