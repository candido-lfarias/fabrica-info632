const fornecedorRepository = require('../repositories/FornecedorRepository');

class FornecedorService {
  async createFornecedor(data) {
   
    const existing = await fornecedorRepository.findByCnpjCpf(data.cnpjCpf);
    if (existing) {
      throw { status: 409, message: 'Fornecedor com este CNPJ/CPF já existe.' };
    }

    return await fornecedorRepository.create(data);
  }

  async listFornecedores(page = 1, limit = 10, filters = {}) {
    const skip = (page - 1) * limit;
    const take = Number(limit);

    // Construção dos filtros dinâmicos
    const where = { deletedAt: null };
    
    if (filters.razao) {
      where.razao = { contains: filters.razao }; 
    }
    if (filters.cnpjCpf) {
      where.cnpjCpf = { contains: filters.cnpjCpf };
    }
    if (filters.qualificacao) {
      where.qualificacao = filters.qualificacao;
    }

    const { total, data } = await fornecedorRepository.findAll({ skip, take, where });

    return {
      data,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async getFornecedorById(id) {
    const fornecedor = await fornecedorRepository.findById(id);
    if (!fornecedor) {
      throw { status: 404, message: 'Fornecedor não encontrado.' };
    }
    return fornecedor;
  }

  async updateFornecedor(id, data) {
  
    await this.getFornecedorById(id);
    
    
    if (data.cnpjCpf) {
      const existing = await fornecedorRepository.findByCnpjCpf(data.cnpjCpf);
      if (existing && existing.id !== Number(id)) {
         throw { status: 409, message: 'CNPJ/CPF já pertence a outro fornecedor.' };
      }
    }

    return await fornecedorRepository.update(id, data);
  }

  async deleteFornecedor(id) {

    const fornecedor = await fornecedorRepository.findByIdIncludeDeleted(id);
    
    if (!fornecedor) {
      throw { status: 404, message: 'Fornecedor não encontrado.' };
    }

    if (fornecedor.deletedAt !== null) {
      throw { status: 400, message: 'Fornecedor já está excluído.' };
    }

    return await fornecedorRepository.softDelete(id);
  }
}

module.exports = new FornecedorService();