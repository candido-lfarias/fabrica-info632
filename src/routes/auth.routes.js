const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
// 1. Importar todos os middlewares de validação
const {
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
} = require("../middlewares/validation.middleware");

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
 *       400:
 *         description: Dados de entrada inválidos
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", validateLogin, authController.login);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Inicia o processo de recuperação de senha
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: pedro.pohlmann@example.com
 *     responses:
 *       200:
 *         description: Resposta de sucesso genérica
 *       400:
 *         description: O e-mail fornecido é inválido
 */
router.post(
  "/forgot-password",
  validateForgotPassword,
  authController.forgotPassword,
);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reseta a senha do usuário com um token válido
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *               - passwordConfirmation
 *             properties:
 *               token:
 *                 type: string
 *                 description: O token recebido por e-mail.
 *                 example: "a1b2c3d4..."
 *               password:
 *                 type: string
 *                 description: A nova senha (mínimo 8 caracteres).
 *                 example: "novaSenhaForte123"
 *               passwordConfirmation:
 *                 type: string
 *                 description: A confirmação da nova senha.
 *                 example: "novaSenhaForte123"
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: Dados de entrada inválidos (token inválido/expirado, senhas não conferem)
 */
// 2. Conectar o middleware à rota
router.post(
  "/reset-password",
  validateResetPassword,
  authController.resetPassword,
);

module.exports = router;
