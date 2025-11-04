// Arquivo: src/routes/produtoRoutes.js

const { Router } = require('express');
const produtoController = require('../controllers/produtoController');
const validate = require('../middlewares/validate'); // Nosso middleware de validação
const { createProdutoSchema, updateProdutoSchema } = require('../validators/produtoValidator');

const router = Router();

// --- Rotas para o CRUD de Produto ---

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: API para gerenciamento de produtos da fábrica
 */

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *               unidade:
 *                 type: string
 *                 enum: [un, lt, kg]
 *               valor:
 *                 type: number
 *             example:
 *               descricao: "Café Especial Torrado e Moído"
 *               unidade: "kg"
 *               valor: 85.50
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/produtos', validate(createProdutoSchema), produtoController.create);

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 */
router.get('/produtos', produtoController.list);

router.get('/produtos/:id', produtoController.getById);
router.put('/produtos/:id', validate(updateProdutoSchema), produtoController.update);
router.delete('/produtos/:id', produtoController.delete);

module.exports = router;