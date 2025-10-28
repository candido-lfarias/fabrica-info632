// backend/src/services/fornecedor.service.ts
import { randomUUID } from 'crypto';

// 1. DEFINIÇÃO DO CONTRATO (A FONTE DA VERDADE)
export interface Fornecedor {
  id: string;
  cnpjCpf: string;
  razaoSocial: string;
  nomeFantasia: string;
  status: 'ativo' | 'suspenso';
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

// 2. BANCO DE DADOS FALSO (EM MEMÓRIA)
const fornecedoresDB: Fornecedor[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    cnpjCpf: '11.222.333/0001-44',
    razaoSocial: 'Café & Grãos Torrefação LTDA',
    nomeFantasia: 'Café do Sítio',
    status: 'ativo',
    createdAt: new Date('2023-10-20T10:00:00Z'),
    updatedAt: new Date('2023-10-20T10:00:00Z'),
    deletedAt: null,
  },
  {
    id: 'b2c3d4e5-f6a7-8901-2345-67890abcdef1',
    cnpjCpf: '55.666.777/0001-88',
    razaoSocial: 'Embalagens Plásticas São Paulo S/A',
    nomeFantasia: 'Embalagens SP',
    status: 'ativo',
    createdAt: new Date('2023-09-15T14:30:00Z'),
    updatedAt: new Date('2023-09-15T14:30:00Z'),
    deletedAt: null,
  },
];

// 3. IMPLEMENTAÇÃO DO SERVIÇO MOCKADO
export class FornecedorService {
  
  // Lista todos os fornecedores (respeitando o soft-delete)
  findAll(): Fornecedor[] {
    return fornecedoresDB.filter(f => f.deletedAt === null);
  }

  // Encontra um fornecedor por ID (respeitando o soft-delete)
  findById(id: string): Fornecedor | undefined {
    return fornecedoresDB.find(f => f.id === id && f.deletedAt === null);
  }

  // Cria um novo fornecedor
  create(data: Omit<Fornecedor, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Fornecedor | { error: string } {
    // Validação de unicidade (critério de aceite)
    if (fornecedoresDB.some(f => f.cnpjCpf === data.cnpjCpf)) {
      return { error: 'CNPJ/CPF já cadastrado.' };
    }

    const novoFornecedor: Fornecedor = {
      id: randomUUID(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    fornecedoresDB.push(novoFornecedor);
    return novoFornecedor;
  }
  update(id: string, data: Partial<Omit<Fornecedor, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Fornecedor | undefined {
  const fornecedorIndex = fornecedoresDB.findIndex(f => f.id === id && f.deletedAt === null);

  if (fornecedorIndex === -1) {
    return undefined; // Não encontrado
  }

  const fornecedorAtual = fornecedoresDB[fornecedorIndex];
  const fornecedorAtualizado = {
    ...fornecedorAtual,
    ...data,
    updatedAt: new Date(),
  };

  fornecedoresDB[fornecedorIndex] = fornecedorAtualizado;
  return fornecedorAtualizado;
}

// Realiza a exclusão lógica (soft delete)
softDelete(id: string): { success: boolean; message: string } {
  const fornecedorIndex = fornecedoresDB.findIndex(f => f.id === id);

  if (fornecedorIndex === -1) {
    return { success: false, message: 'Fornecedor não encontrado.' };
  }

  if (fornecedoresDB[fornecedorIndex].deletedAt !== null) {
    return { success: false, message: 'Fornecedor já foi excluído.' };
  }

  fornecedoresDB[fornecedorIndex].deletedAt = new Date();
  fornecedoresDB[fornecedorIndex].updatedAt = new Date(); // A exclusão é uma forma de atualização
  return { success: true, message: 'Fornecedor excluído com sucesso.' };
}
}