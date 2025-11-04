// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');
const swaggerConfig = require('./docs/swagger');
const errorHandler = require('./middlewares/errorHandler');
const { pool, waitForMySQL } = require('./database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.get('/health', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM health_test');
    res.json({
      status: 'up',
      database: 'healthy',
      records: rows,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erro ao consultar banco:', error);
    res.status(500).json({
      status: 'down',
      database: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});


swaggerConfig(app);

app.use(errorHandler);

async function startServer() {
  try {
    console.log('⏳ Aguardando MySQL ficar disponível...');
    await waitForMySQL();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Acesse: http://localhost:${PORT}`);
      console.log(`Teste de Saúde: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Falha ao iniciar servidor:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
