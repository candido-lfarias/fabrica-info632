// database.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',       
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'senha123',
  database: process.env.DB_NAME || 'fabrica',     
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Teste de conexão
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conectado ao MySQL com sucesso!');
    connection.release();
    return true;
  } catch (error) {
    console.error('Erro ao conectar com MySQL:', error.message);
    return false;
  }
}

async function waitForMySQL(maxAttempts = 30, interval = 2000) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(`Tentativa ${attempt}/${maxAttempts} de conectar ao MySQL...`);

    if (await testConnection()) {
      console.log('MySQL está pronto para uso!');
      return true;
    }

    if (attempt < maxAttempts) {
      console.log(`⏳ Aguardando ${interval / 1000} segundos para próxima tentativa...`);
      await new Promise(resolve => setTimeout(resolve, interval));
    }
  }

  throw new Error('Não foi possível conectar ao MySQL após várias tentativas.');
}

module.exports = { pool, testConnection, waitForMySQL };
