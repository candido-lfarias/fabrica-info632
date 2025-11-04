const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { validateLogin } = require("../middlewares/validation.middleware");

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
 *     summary: Autentica um usuário via CPF e senha e retorna um token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cpf
 *               - password
 *             properties:
 *               cpf:
 *                 type: string
 *                 description: "CPF do usuário (apenas números)."
 *                 example: "12345678901"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: "Login bem-sucedido"
 *       400:
 *         description: "Dados de entrada inválidos (ex: CPF mal formatado)"
 *       401:
 *         description: "Credenciais inválidas (CPF ou senha incorretos)"
 */
router.post(
  "/login",
  // Middleware de log de depuração
  (req, res, next) => {
    console.log("1. Rota /login atingida");
    next();
  },
  validateLogin,
  authController.login,
);

module.exports = router;
