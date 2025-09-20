const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const paymentRoutes = require('./routes/payments');
const riskRoutes = require('./routes/risk');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/payments', paymentRoutes);
app.use('/api/risk', riskRoutes);
app.use('/api/auth', authRoutes);

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'OpenTrust AI Backend is running',
    services: {
      openPayments: 'Integrated'
    }
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    error: 'Something went wrong!',
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`OpenTrust AI backend running on port ${PORT}`);
  console.log(`Open Payments integration: ${process.env.ILP_CLIENT_ID ? 'Configured' : 'Not configured'}`);
});