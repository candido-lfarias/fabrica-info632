const { z } = require('zod');

const createProdutoSchema = z.object({
  body: z.object({
    descricao: z.string({
        required_error: 'A descrição é obrigatória.',
        invalid_type_error: 'A descrição deve ser um texto.',
      })
      .min(3, 'A descrição deve ter no mínimo 3 caracteres.'),
    
    unidade: z.enum(['un', 'lt', 'kg'], {
      required_error: 'A unidade é obrigatória.',
      invalid_type_error: "A unidade deve ser 'un', 'lt' ou 'kg'.",
    }),

    valor: z.number({
        required_error: 'O valor é obrigatório.',
        invalid_type_error: 'O valor deve ser um número.',
      })
      .positive('O valor deve ser um número positivo.'),
  }),
});


const updateProdutoSchema = z.object({
  body: z.object({
    descricao: z
      .string({ invalid_type_error: 'A descrição deve ser um texto.' })
      .min(3, 'A descrição deve ter no mínimo 3 caracteres.')
      .optional(),
    
    unidade: z
      .enum(['un', 'lt', 'kg'], {
        invalid_type_error: "A unidade deve ser 'un', 'lt' ou 'kg'.",
      })
      .optional(),

    valor: z
      .number({ invalid_type_error: 'O valor deve ser um número.' })
      .positive('O valor deve ser um número positivo.')
      .optional(),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, 'O ID do produto deve ser um número.').transform(Number),
  }),
});

module.exports = {
  createProdutoSchema,
  updateProdutoSchema,
};