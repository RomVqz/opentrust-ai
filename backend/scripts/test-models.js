const User = require('../models/User');
const Transaction = require('../models/Transaction');

const testModels = async () => {
  try {
    console.log('=== Probando Modelos de Datos ===');
    
    // Probar el modelo User
    const user = await User.findByEmail('test@opentrust.ai');
    console.log('Usuario encontrado:', user);
    
    // Probar el modelo Transaction
    if (user) {
      const transactions = await Transaction.findByUserId(user.id);
      console.log('Transacciones del usuario:', transactions);
    }
    
    console.log('=== Prueba de Modelos Completada ===');
  } catch (error) {
    console.error('Error probando modelos:', error);
  }
};

testModels();