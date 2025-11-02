const { z } = require('zod');

const createInsumoSchema = z.object({
  body: z.object({
    descricao: z.string({ required_error: 'A descrição é obrigatória.' })
      .min(3, 'A descrição deve ter no mínimo 3 caracteres.'),
    unidade: z.enum(['un', 'lt', 'kg'], { errorMap: () => ({ message: "A unidade deve ser 'un', 'lt' ou 'kg'." }) }),
  }),
});

const updateInsumoSchema = z.object({
  body: z.object({
    descricao: z.string().min(3, 'A descrição deve ter no mínimo 3 caracteres.').optional(),
    unidade: z.enum(['un', 'lt', 'kg'], { errorMap: () => ({ message: "A unidade deve ser 'un', 'lt' ou 'kg'." }) }).optional(),
  }),
  params: z.object({
    id: z.string().refine((val) => {
      const num = parseInt(val, 10);
      return !isNaN(num) && num > 0;
    }, { message: 'O ID do insumo é inválido.' }),
  }),
});

module.exports = {
  createInsumoSchema,
  updateInsumoSchema,
};