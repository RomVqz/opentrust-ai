const RiskService = require('../src/services/riskService');

// Crear una instancia del servicio de riesgo
const riskService = new RiskService();

// Datos de prueba para un pago
const testPayment = {
  amount: 2500,
  currency: 'USD',
  sender_wallet: 'new_sender@wallet.com',
  receiver_wallet: 'test@opentrust.pay',
  countryCode: 'DE'
};

// Contexto de prueba
const testContext = {
  isNewSender: true,
  isUnusualLocation: false,
  averageTransactionAmount: 100
};

// Probar el análisis de riesgo
const analysis = riskService.analyzePayment(testPayment, testContext);

console.log('=== Prueba del Modelo de Riesgo ===');
console.log('Datos del pago:', testPayment);
console.log('Contexto:', testContext);
console.log('Resultado del análisis:');
console.log('- Puntaje de riesgo:', analysis.risk_score);
console.log('- Explicación:', analysis.explanation);
console.log('- Recomendación:', analysis.recommendation);
console.log('- Factores:', analysis.factors);