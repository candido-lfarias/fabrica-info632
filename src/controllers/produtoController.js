const produtoService = require('../services/produtoService');

class ProdutoController {
  
  async create(req, res, next) {
    try {
      const produto = await produtoService.createProduto(req.body);
      return res.status(201).json({
        success: true,
        message: 'Produto criado com sucesso.',
        data: produto,
      });
    } catch (error) {
      next(error);
    }
  }

  async list(req, res, next) {
    try {
      const produtos = await produtoService.listProdutos();
      return res.status(200).json({
        success: true,
        data: produtos,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const produto = await produtoService.findProdutoById(Number(id));
      return res.status(200).json({
        success: true,
        data: produto,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updatedProduto = await produtoService.updateProduto(Number(id), req.body);
      return res.status(200).json({
        success: true,
        message: 'Produto atualizado com sucesso.',
        data: updatedProduto,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await produtoService.deleteProduto(Number(id));
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProdutoController();