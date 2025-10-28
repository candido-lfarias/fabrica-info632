// backend/src/validators/fornecedor.validator.ts
import { z } from 'zod';
import { isValidCnpjCpf } from '../utils/validator'; 


export const createFornecedorSchema = z.object({
  razaoSocial: z.string()
    .min(1, { message: 'Razão Social é obrigatória.' })
    .min(3, { message: 'Razão Social deve ter no mínimo 3 caracteres.' }),
    
  nomeFantasia: z.string()
    .min(1, { message: 'Nome Fantasia é obrigatório.' })
    .min(2, { message: 'Nome Fantasia deve ter no mínimo 2 caracteres.' }),
    
  cnpjCpf: z.string()
    .min(1, { message: 'CNPJ/CPF é obrigatório.' })
   
    .refine(isValidCnpjCpf, {
      message: 'CNPJ ou CPF inválido.',
    }),
    
 
  status: z.enum(['ativo', 'suspenso']),
});


export const updateFornecedorSchema = createFornecedorSchema.partial();