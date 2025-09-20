const pool = require('../config/db');

class Transaction {
  static async create(transactionData) {
    const {
      user_id,
      amount,
      currency,
      sender_wallet,
      receiver_wallet,
      risk_score,
      explanation,
      factors,
      country_code,
      payment_method
    } = transactionData;

    const res = await pool.query(
      `INSERT INTO transactions 
       (user_id, amount, currency, sender_wallet, receiver_wallet, risk_score, explanation, factors, country_code, payment_method)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [user_id, amount, currency, sender_wallet, receiver_wallet, risk_score, explanation, factors, country_code, payment_method]
    );
    return res.rows[0];
  }

  static async findByUserId(userId) {
    const res = await pool.query(
      'SELECT * FROM transactions WHERE user_id = $1 ORDER BY timestamp DESC',
      [userId]
    );
    return res.rows;
  }

  static async findSendersByUserId(userId) {
    const res = await pool.query(
      `SELECT sender_wallet, COUNT(*) as count, MAX(timestamp) as last_seen
       FROM transactions 
       WHERE user_id = $1 
       GROUP BY sender_wallet`,
      [userId]
    );
    return res.rows;
  }
}

module.exports = Transaction;