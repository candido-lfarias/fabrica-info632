const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { validateLogin } = require("../middlewares/validation.middleware"); // 1. Importar o middleware

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints para autenticação de usuários
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: pedro.pohlmann
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login bem-sucedido!
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Dados de entrada inválidos (ex: username faltando)
 *       401:
 *         description: Credenciais inválidas (usuário ou senha incorretos)
 */
// 2. Adicionar o middleware na cadeia de execução da rota
router.post("/login", validateLogin, authController.login);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Inicia o processo de recuperação de senha
 *     tags: [Autenticação]
 *     responses:
 *       501:
 *         description: Endpoint não implementado
 */
router.post("/forgot-password", authController.forgotPassword);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reseta a senha do usuário com um token válido
 *     tags: [Autenticação]
 *     responses:
 *       501:
 *         description: Endpoint não implementado
 */
router.post("/reset-password", authController.resetPassword);

module.exports = router;
