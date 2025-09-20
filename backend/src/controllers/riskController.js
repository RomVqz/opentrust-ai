const RiskService = require('../services/riskService');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

const riskService = new RiskService();

const analyzePayment = async (req, res) => {
  try {
    const {
      amount,
      currency,
      sender_wallet,
      receiver_wallet,
      country_code,
      payment_method,
      user_email
    } = req.body;

    // Buscar o crear usuario
    let user = await User.findByEmail(user_email);
    if (!user) {
      user = await User.create(user_email);
    }

    // Obtener contexto para el análisis de riesgo
    const senderHistory = await Transaction.findSendersByUserId(user.id);
    const isNewSender = !senderHistory.some(s => s.sender_wallet === sender_wallet);
    
    const context = {
      isNewSender,
      isUnusualLocation: await checkUnusualLocation(country_code, user.id),
      averageTransactionAmount: user.average_transaction_amount
    };

    // Realizar análisis de riesgo
    const paymentData = {
      amount,
      currency,
      sender_wallet,
      receiver_wallet,
      countryCode: country_code
    };

    const analysis = riskService.analyzePayment(paymentData, context);

    // Guardar transacción en la base de datos
    const transaction = await Transaction.create({
      user_id: user.id,
      amount,
      currency,
      sender_wallet,
      receiver_wallet,
      risk_score: analysis.risk_score,
      explanation: analysis.explanation,
      factors: analysis.factors,
      country_code,
      payment_method,
      status: analysis.recommendation === 'approve' ? 'approved' : 'pending'
    });

    // Actualizar estadísticas del usuario
    await User.updateTransactionStats(user.id, amount);

    res.json({
      success: true,
      data: {
        transaction_id: transaction.id,
        risk_score: analysis.risk_score,
        explanation: analysis.explanation,
        recommendation: analysis.recommendation,
        confidence: analysis.confidence,
        factors: analysis.factors
      }
    });
  } catch (error) {
    console.error('Error analyzing payment:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Función auxiliar para verificar ubicaciones inusuales
async function checkUnusualLocation(countryCode, userId) {
  // En una implementación real, verificaríamos el historial de ubicaciones del usuario
  // Por ahora, simplemente devolvemos false como placeholder
  return false;
}

module.exports = {
  analyzePayment
};