const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const migrate = async () => {
  try {
    // Leer el archivo SQL
    const fs = require('fs');
    const path = require('path');
    const sql = fs.readFileSync(path.join(__dirname, 'create-db.sql'), 'utf8');
    
    // Ejecutar las consultas
    await pool.query(sql);
    console.log('Base de datos migrada exitosamente');
  } catch (error) {
    console.error('Error migrando la base de datos:', error);
  } finally {
    await pool.end();
  }
};

migrate();