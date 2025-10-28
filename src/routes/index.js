
const express = require('express');
const router = express.Router();

// Importe as rotas de usuário
const userRoutes = require('./userRoutes');

// Rota de boas-vindas
router.get('/', (req, res) => {
  res.json({ mensagem: 'Bem vindo a API de Gestão de Produção' });
});

// Rota de versão
router.get('/version', (req, res) => {
  res.json({ version: '1.0.0' });
});

// Use as rotas de usuário
router.use(userRoutes);

module.exports = router;