const prisma = require('../lib/prisma');
const Insumo = require('../models/Insumo');

class InsumoRepository {
  async create(data) {
    const prismaInsumo = await prisma.insumo.create({
      data: {
        descricao: data.descricao,
        unidade: data.unidade,
      },
    });
    return new Insumo(prismaInsumo);
  }

  async findById(id) {
    const prismaInsumo = await prisma.insumo.findUnique({
      where: { idinsumo: id },
    });

    return prismaInsumo ? new Insumo(prismaInsumo) : null;
  }

  async findManyWithFilters({ page = 1, limit = 10, descricao }) {
    const skip = (page - 1) * limit;
    const where = {};

    if (descricao) {
      where.descricao = { contains: descricao, mode: 'insensitive' };
    }

    const [prismaInsumos, total] = await Promise.all([
      prisma.insumo.findMany({ where, skip, take: limit }),
      prisma.insumo.count({ where }),
    ]);

    const insumos = prismaInsumos.map(insumo => new Insumo(insumo));

    return { insumos, total };
  }

  async update(id, data) {
    const prismaInsumo = await prisma.insumo.update({
      where: { idinsumo: id },
      data: {
        descricao: data.descricao,
        unidade: data.unidade,
      },
    });
    return new Insumo(prismaInsumo);
  }

  async delete(id) {
    await prisma.insumo.delete({
      where: { idinsumo: id },
    });
  }
}

module.exports = new InsumoRepository();