const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const seedData = async () => {
  try {
    // Insertar usuario de prueba
    await pool.query(
      "INSERT INTO users (email, risk_profile) VALUES ('test@opentrust.ai', 'medium') ON CONFLICT (email) DO NOTHING"
    );

    // Obtener ID del usuario
    const userRes = await pool.query("SELECT id FROM users WHERE email = 'test@opentrust.ai'");
    const userId = userRes.rows[0].id;

    // Insertar transacciones de ejemplo
    const transactions = [
      {
        amount: 100.00,
        sender_wallet: 'sender1@wallet.com',
        risk_score: 25,
        explanation: 'Transacción normal de remitente conocido'
      },
      {
        amount: 2500.00,
        sender_wallet: 'new_sender@wallet.com',
        risk_score: 75,
        explanation: 'Monto inusual y remitente nuevo'
      },
      {
        amount: 50.00,
        sender_wallet: 'sender2@wallet.com',
        risk_score: 10,
        explanation: 'Transacción de bajo riesgo'
      }
    ];

    for (const tx of transactions) {
      await pool.query(
        `INSERT INTO transactions 
         (user_id, amount, currency, sender_wallet, receiver_wallet, risk_score, explanation, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [userId, tx.amount, 'USD', tx.sender_wallet, 'test@opentrust.pay', tx.risk_score, tx.explanation, 'completed']
      );
    }

    console.log('Datos de prueba insertados exitosamente');
  } catch (error) {
    console.error('Error insertando datos de prueba:', error);
  } finally {
    await pool.end();
  }
};

seedData();