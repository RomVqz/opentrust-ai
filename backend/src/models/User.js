const pool = require('../config/db');

class User {
  static async findByEmail(email) {
    const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0];
  }

  static async create(email, riskProfile = 'medium') {
    const res = await pool.query(
      'INSERT INTO users (email, risk_profile) VALUES ($1, $2) RETURNING *',
      [email, riskProfile]
    );
    return res.rows[0];
  }

  static async updateTransactionStats(userId, amount) {
    const res = await pool.query(
      `UPDATE users 
       SET total_transactions = total_transactions + 1,
           average_transaction_amount = ((average_transaction_amount * total_transactions) + $1) / (total_transactions + 1)
       WHERE id = $2
       RETURNING *`,
      [amount, userId]
    );
    return res.rows[0];
  }
}

module.exports = User;