const { Router } = require('express');
const customerController = require('../controllers/customerController');
const validate = require('../middlewares/validate'); // Middleware para validação
const { createCustomerSchema, updateCustomerSchema } = require('../validators/customerValidator'); // Importando os validadores

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: API for managing customers
 */

// Route to create a new customer
router.post('/customers', validate(createCustomerSchema), customerController.create);

// Route to list all customers
router.get('/customers', customerController.list);

// Route to get a customer by ID
router.get('/customers/:id', customerController.getById);

// Route to update a customer
router.put('/customers/:id', validate(updateCustomerSchema), customerController.update);

// Route to delete a customer
router.delete('/customers/:id', customerController.delete);

module.exports = router;
