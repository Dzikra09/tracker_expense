require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware dasar
app.use(cors());
app.use(express.json());

// Endpoint tes 1: memastikan server Express berjalan
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server berjalan dengan baik',
  });
});

// Endpoint tes 2: memastikan koneksi ke MySQL berhasil
app.get('/api/db-test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.status(200).json({
      status: 'success',
      message: 'Koneksi database berhasil',
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Koneksi database gagal',
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

const authRoutes = require('./src/routes/authRoutes');

// Tambahkan setelah app.use(express.json())
app.use('/api/auth', authRoutes);

const categoryRoutes = require('./src/routes/categoryRoutes');

// Tambahkan setelah app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);

const transactionRoutes = require('./src/routes/transactionRoutes');

// Tambahkan setelah app.use('/api/categories', categoryRoutes);
app.use('/api/transactions', transactionRoutes);

const dashboardRoutes = require('./src/routes/dashboardRoutes');

// Tambahkan setelah app.use('/api/transactions', transactionRoutes);
app.use('/api/dashboard', dashboardRoutes);