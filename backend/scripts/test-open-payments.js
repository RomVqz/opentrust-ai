require('dotenv').config();
const paymentService = require('../src/services/paymentService');

console.log('🔌 Probando integración con Open Payments API (DPoP)...');
console.log('Variables de entorno:');
console.log('ILP_WALLET_URL:', process.env.ILP_WALLET_URL || 'https://wallet.interledger-test.dev');
console.log('ILP_PRIVATE_KEY:', process.env.ILP_PRIVATE_KEY ? 'Presente' : 'FALTA');
console.log('ILP_KEY_ID:', process.env.ILP_KEY_ID || 'FALTA');

if (!process.env.ILP_PRIVATE_KEY || !process.env.ILP_KEY_ID) {
  console.log('\n❌ Credenciales faltantes. Por favor:');
  console.log('1. Ve a https://wallet.interledger-test.dev/');
  console.log('2. En Settings → Developer Keys genera un par de llaves');
  console.log('3. Sube la clave pública al wallet');
  console.log('4. Copia la clave privada en `.env` como ILP_PRIVATE_KEY');
  console.log('5. Copia la URL del key (ej: https://wallet.interledger-test.dev/keys/freelance) como ILP_KEY_ID');
  process.exit(1);
}

async function testOpenPaymentsIntegration() {
  try {
    // 1. Probamos la obtención de información de la wallet
    console.log('\n1. Obteniendo información de la wallet...');
    const walletInfo = await paymentService.getWalletInfo();
    console.log('✅ Información de la wallet obtenida:');
    console.log('   - ID:', walletInfo.id);
    console.log('   - Nombre:', walletInfo.name);
    console.log('   - Asset Code:', walletInfo.assetCode);
    console.log('   - Asset Scale:', walletInfo.assetScale);

    // 2. Listar pagos entrantes
    console.log('\n2. Listando pagos entrantes...');
    const payments = await paymentService.listIncomingPayments(5);
    console.log(`✅ Se encontraron ${payments.length} pagos entrantes`);

    if (payments && payments.length > 0) {
      console.log('\n3. Detalles del primer pago:');
      const firstPaymentId = payments[0].id;
      const paymentDetails = await paymentService.getIncomingPayment(firstPaymentId);
      console.log('   - ID:', paymentDetails.id);
      console.log('   - Estado:', paymentDetails.state);
      console.log('   - Monto:', paymentDetails.amount.value, paymentDetails.assetCode);
    }

    console.log('\n🎉 Integración con Open Payments API probada exitosamente!');
  } catch (error) {
    console.error('\n❌ Error en la integración:', error.message);
    console.error('Detalles:', error.response?.data || error);

    console.log('\nPosibles soluciones:');
    console.log('1. Verifica que la clave privada esté bien formateada en el .env (con saltos de línea correctos)');
    console.log('2. Verifica que el ILP_KEY_ID apunte a la URL de la clave pública en el wallet');
    console.log('3. Consulta la documentación: https://openpayments.dev/es/sdk/wallet-get-info');
  }
}

testOpenPaymentsIntegration();
