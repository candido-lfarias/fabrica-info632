const { z } = require('zod');

// Esquema para a criação de um novo usuário
const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres.'),
    email: z.string().email('O e-mail fornecido é inválido.'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  }),
});

// Esquema para a atualização de um usuário
const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres.').optional(),
    email: z.string().email('O e-mail fornecido é inválido.').optional(),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.').optional(),
  }),
  params: z.object({
    id: z.string().uuid('O ID do usuário é inválido.'),
  }),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};
