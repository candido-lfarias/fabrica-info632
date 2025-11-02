const insumoService = require('../services/insumoService');

class InsumoController {
  async create(req, res, next) {
    try {
      const insumo = await insumoService.createInsumo(req.body);
      return res.status(201).json({
        success: true,
        message: 'Insumo criado com sucesso.',
        data: insumo,
      });
    } catch (error) {
      next(error);
    }
  }

  async list(req, res, next) {
    try {
      const { page = 1, limit = 10, descricao } = req.query;
      const { insumos, total } = await insumoService.listInsumos({
        page: Number(page),
        limit: Number(limit),
        descricao,
      });

      return res.status(200).json({
        success: true,
        data: insumos,
        meta: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const insumo = await insumoService.findInsumoById(Number(id));
      return res.status(200).json({
        success: true,
        data: insumo,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updatedInsumo = await insumoService.updateInsumo(Number(id), req.body);
      return res.status(200).json({
        success: true,
        message: 'Insumo atualizado com sucesso.',
        data: updatedInsumo,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await insumoService.deleteInsumo(Number(id));
      return res.status(204).send(); 
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new InsumoController();