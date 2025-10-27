const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes"); // 1. Importar as novas rotas

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna uma mensagem de boas-vindas
 *     description: Endpoint raiz da API para verificar se está online.
 *     tags: [Status]
 *     responses:
 *       200:
 *         description: 'Bem vindo a API de Gestão de Produção'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: 'Bem vindo a API de Gestão de Produção'
 */
router.get("/", (req, res) => {
  res.json({ mensagem: "Bem vindo a API de Gestão de Produção" });
});

/**
 * @swagger
 * /version:
 *   get:
 *     summary: Retorna a versão da API
 *     description: Endpoint para verificar a versão atual da API.
 *     tags: [Status]
 *     responses:
 *       200:
 *         description: 'Versão da API'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 version:
 *                   type: string
 *                   example: '1.0.0'
 */
router.get("/version", (req, res) => {
  res.json({ version: "1.0.0" });
});

// 2. Montar as rotas de autenticação sob o prefixo /auth
router.use("/auth", authRoutes);

module.exports = router;
