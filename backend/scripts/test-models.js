const User = require('../src/models/User');
const Transaction = require('../src/models/Transaction');

const testModels = async () => {
  try {
    console.log('=== Probando Modelos de Datos ===');

    // Probar el modelo User
    const user = await User.findByEmail('test@opentrust.ai');
    if (user) {
      console.log('Usuario encontrado:', user);
      const transactions = await Transaction.findByUserId(user.id);
      if (transactions && transactions.length > 0) {
        console.log('Transacciones del usuario:', transactions);
      } else {
        console.log('No se encontraron transacciones para el usuario.');
      }
    } else {
      console.log('No se encontró el usuario test@opentrust.ai en la base de datos.');
    }

    console.log('=== Prueba de Modelos Completada ===');
  } catch (error) {
    console.error('Error probando modelos:', error);
  }
};

testModels();