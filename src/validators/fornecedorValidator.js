const { z } = require('zod');

const fornecedorSchema = z.object({
  cnpjCpf: z.string().min(11, "CNPJ/CPF inválido"),
  ie: z.string().optional(),
  razao: z.string().min(3, "Razão social é obrigatória"),
  nomeFantasia: z.string().optional(),
  
  contatos: z.array(z.object({
    nome: z.string(),
    email: z.string().email(),
    telefone: z.string().optional()
  })).optional(),
  condPagtoPadrao: z.string().optional(),
  leadTimeDias: z.number().int().nonnegative().optional(),
  qualificacao: z.enum(["APROVADO", "SUSPENSO"]).optional().default("APROVADO")
});

const validateFornecedor = (data) => {
  return fornecedorSchema.safeParse(data);
};

module.exports = { validateFornecedor };