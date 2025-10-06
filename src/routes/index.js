
const express = require('express');
const router = express.Router();

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

/**
 * @swagger
 * 
 * /get:
 *     summary: Retorna a versão da API
 *     responses:
 *       200:
 *         description: '1.0.0''
 */
router.get('/version', (req, res) => {
  res.json({ version: '1.0.0' });
});

module.exports = router;