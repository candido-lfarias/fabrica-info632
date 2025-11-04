const { z } = require('zod');

// Schema for creating a new customer
const createCustomerSchema = z.object({
  body: z.object({
    nome: z.string().min(3, 'Name must have at least 3 characters.'),
    email: z.string().email('The provided email is invalid.'),
    telefone: z.string().min(10, 'Phone number must have at least 10 characters.'),
  }),
});

// Schema for updating a customer
const updateCustomerSchema = z.object({
  body: z.object({
    nome: z.string().min(3, 'Name must have at least 3 characters.').optional(),
    email: z.string().email('The provided email is invalid.').optional(),
    telefone: z.string().min(10, 'Phone number must have at least 10 characters.').optional(),
  }),
  params: z.object({
    id: z.string().uuid('Customer ID is invalid.'),
  }),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
};
