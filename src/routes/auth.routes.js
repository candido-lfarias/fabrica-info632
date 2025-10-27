const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

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
 *     responses:
 *       501:
 *         description: Endpoint não implementado
 */
router.post("/login", authController.login);

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
