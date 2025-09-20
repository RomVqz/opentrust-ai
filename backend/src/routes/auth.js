const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Usuarios demo (puedes cambiar por BD real)
const users = [
  { username: 'admin', password: 'admin123' },
  { username: 'user', password: 'user123' }
];

const JWT_SECRET = process.env.JWT_SECRET || 'opentrust_secret';

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
  }
  // Generar token
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ success: true, token });
});

module.exports = router;
