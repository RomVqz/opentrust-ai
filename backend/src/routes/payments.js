const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Rutas para pagos
router.get('/incoming-payments', paymentController.getIncomingPayments);
router.get('/incoming-payments/:paymentId', paymentController.getPaymentDetails);
router.post('/verify-payment/:paymentId', paymentController.verifyPayment);
// Endpoint para análisis de pago
router.post('/analyze', paymentController.analyzePayment);
// Endpoint para obtener transacciones
router.get('/transactions', paymentController.getTransactions);


module.exports = router;



