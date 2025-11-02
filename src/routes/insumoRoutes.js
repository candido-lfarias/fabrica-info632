const { Router } = require('express');
const insumoController = require('../controllers/insumoController');
const validate = require('../middlewares/validate'); // Precisamos criar este middleware!
const { createInsumoSchema, updateInsumoSchema } = require('../validators/insumoValidator');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Insumos
 *   description: API para gerenciamento de insumos da fábrica
 */

/**
 * @swagger
 * /insumos:
 *   post:
 *     summary: Cria um novo insumo
 *     tags: [Insumos]
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
 *             example:
 *               descricao: "Grãos de Café Arábica"
 *               unidade: "kg"
 *     responses:
 *       201:
 *         description: Insumo criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/insumos', validate(createInsumoSchema), insumoController.create);

/**
 * @swagger
 * /insumos:
 *   get:
 *     summary: Lista todos os insumos
 *     tags: [Insumos]
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
 *         name: descricao
 *         schema:
 *           type: string
 *         description: Filtrar por descrição do insumo
 *     responses:
 *       200:
 *         description: Lista de insumos retornada com sucesso
 */
router.get('/insumos', insumoController.list);

/**
 * @swagger
 * /insumos/{id}:
 *   get:
 *     summary: Busca um insumo pelo ID
 *     tags: [Insumos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do insumo
 *     responses:
 *       200:
 *         description: Insumo encontrado
 *       404:
 *         description: Insumo não encontrado
 */
router.get('/insumos/:id', insumoController.getById);

/**
 * @swagger
 * /insumos/{id}:
 *   put:
 *     summary: Atualiza um insumo existente
 *     tags: [Insumos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do insumo
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
 *             example:
 *               descricao: "Grãos de Café Robusta"
 *               unidade: "kg"
 *     responses:
 *       200:
 *         description: Insumo atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Insumo não encontrado
 */
router.put('/insumos/:id', validate(updateInsumoSchema), insumoController.update);

/**
 * @swagger
 * /insumos/{id}:
 *   delete:
 *     summary: Deleta um insumo
 *     tags: [Insumos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do insumo
 *     responses:
 *       204:
 *         description: Insumo deletado com sucesso
 *       404:
 *         description: Insumo não encontrado
 */
router.delete('/insumos/:id', insumoController.delete);

module.exports = router;