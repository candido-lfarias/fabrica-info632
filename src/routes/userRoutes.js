const { Router } = require('express');
const userController = require('../controllers/userController');
const validate = require('../middlewares/validate'); 
const { createUserSchema, updateUserSchema } = require('../validators/userValidator');

const router = Router();

// --- Rotas para o CRUD de Usuário ---

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: API para gerenciamento de usuários
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               name: "Isadora"
 *               email: "isadora@aucaramelo.com"
 *               password: "senhaForte123"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: E-mail já cadastrado
 */
router.post('/usuarios', validate(createUserSchema), userController.create);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Quantidade de itens por página
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrar por nome
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 */
router.get('/usuarios', userController.list);
router.get('/usuarios/:id', userController.getById);
router.put('/usuarios/:id', validate(updateUserSchema), userController.update);
router.delete('/usuarios/:id', userController.delete);

module.exports = router;