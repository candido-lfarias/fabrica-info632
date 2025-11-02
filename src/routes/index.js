const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const insumoRoutes = require('./insumoRoutes'); 

router.get('/', (req, res) => {
  res.json({ mensagem: 'Bem vindo a API de Gestão de Produção' });
});

router.get('/version', (req, res) => {
  res.json({ version: '1.0.0' });
});

router.use(userRoutes);
router.use(insumoRoutes); 

module.exports = router;