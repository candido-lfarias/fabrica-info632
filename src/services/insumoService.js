const insumoRepository = require('../repositories/insumoRepository');

class InsumoService {
  async createInsumo(insumoData) {
    const novoInsumo = await insumoRepository.create(insumoData);
    return novoInsumo;
  }

  async listInsumos(filters) {
    const { insumos, total } = await insumoRepository.findManyWithFilters(filters);
    return { insumos, total };
  }

  async findInsumoById(id) {
    const insumo = await insumoRepository.findById(id);
    if (!insumo) {
      const error = new Error('Insumo não encontrado.');
      error.statusCode = 404;
      throw error;
    }
    return insumo;
  }

  async updateInsumo(id, data) {
    await this.findInsumoById(id);
    return await insumoRepository.update(id, data);
  }

  async deleteInsumo(id) {
    await this.findInsumoById(id);
    await insumoRepository.delete(id);
  }
}

module.exports = new InsumoService();