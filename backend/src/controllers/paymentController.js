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
  }
};

module.exports = paymentController;