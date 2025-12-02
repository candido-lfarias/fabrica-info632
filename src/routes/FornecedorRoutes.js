const express = require('express');
const router = express.Router();
const fornecedorController = require('../controllers/FornecedorController');

/**
 * @swagger
 * tags:
 *   name: Fornecedores
 *   description: Gerenciamento de fornecedores
 */

/**
 * @swagger
 * /api/fornecedores:
 *   get:
 *     summary: Lista todos os fornecedores
 *     tags: [Fornecedores]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página
 *       - in: query
 *         name: razao
 *         schema:
 *           type: string
 *         description: Filtro por razão social
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 */
router.get('/', fornecedorController.list);

/**
 * @swagger
 * /api/fornecedores/{id}:
 *   get:
 *     summary: Busca fornecedor por ID
 *     tags: [Fornecedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do fornecedor
 *       404:
 *         description: Fornecedor não encontrado
 */
router.get('/:id', fornecedorController.getById);

/**
 * @swagger
 * /api/fornecedores:
 *   post:
 *     summary: Cria um novo fornecedor
 *     tags: [Fornecedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cnpjCpf:
 *                 type: string
 *               razao:
 *                 type: string
 *               contatos:
 *                  type: array
 *                  items:
 *                    type: object
 *     responses:
 *       201:
 *         description: Fornecedor criado
 *       409:
 *         description: CNPJ/CPF já existe
 */
router.post('/', fornecedorController.create);

router.put('/:id', fornecedorController.update);

router.delete('/:id', fornecedorController.delete);

module.exports = router;