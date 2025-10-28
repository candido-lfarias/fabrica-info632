const express = require('express');
const dotenv = require('dotenv'); 
const routes = require('./routes'); // Assumindo que você tem um ./routes/index.js
const swaggerConfig = require('./docs/swagger');
const errorHandler = require('./middlewares/errorHandler'); // Importe o nosso handler

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rotas da API
app.use('/api', routes);

// Swagger
swaggerConfig(app);

// Middleware de Tratamento de Erros (IMPORTANTE: Deve ser o último 'app.use')
app.use(errorHandler);

// Iniciar servidor
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;