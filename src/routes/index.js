const express = require('express');
const router = express.Router();
const fornecedorRoutes = require('./FornecedorRoutes'); 

/**
 * @swagger
 * 
 * /get:
 *     summary: Retorna uma mensagem de boas-vindas
 *     responses:
 *       200:
 *         description: Bem vindo a API de Gestão de Produção'
 */
router.get('/', (req, res) => {
  res.json({ mensagem: 'Bem vindo a API de Gestão de Produção' });
});

router.get('/version', (req, res) => {
  res.json({ version: '1.0.0' });
});

router.use('/fornecedores', fornecedorRoutes);

module.exports = router;