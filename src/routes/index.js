const express = require('express');
const router = express.Router();

const produtoRoutes = require('./produtoRoutes');

router.get('/', (req, res) => {
  res.json({ mensagem: 'Bem vindo a API de Gestão de Produção' });
});

router.get('/version', (req, res) => {
  res.json({ version: '1.0.0' });
});
router.use(produtoRoutes);

module.exports = router;