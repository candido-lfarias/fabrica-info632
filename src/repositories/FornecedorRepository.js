const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class FornecedorRepository {
  async create(data) {
    return await prisma.fornecedor.create({
      data
    });
  }

  async findByCnpjCpf(cnpjCpf) {
    return await prisma.fornecedor.findUnique({
      where: { cnpjCpf }
    });
  }

  async findById(id) {
    return await prisma.fornecedor.findFirst({
      where: { 
        id: Number(id),
        deletedAt: null 
      }
    });
  }


  async findByIdIncludeDeleted(id) {
    return await prisma.fornecedor.findUnique({
      where: { id: Number(id) }
    });
  }

  async findAll({ skip, take, where }) {
    const [total, data] = await Promise.all([
      prisma.fornecedor.count({ where }),
      prisma.fornecedor.findMany({
        skip,
        take,
        where,
        orderBy: { razao: 'asc' }
      })
    ]);
    return { total, data };
  }

  async update(id, data) {
    return await prisma.fornecedor.update({
      where: { id: Number(id) },
      data
    });
  }

  async softDelete(id) {
    return await prisma.fornecedor.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() }
    });
  }
}

module.exports = new FornecedorRepository();