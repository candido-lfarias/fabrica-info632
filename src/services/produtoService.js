const produtoRepository = require('../repositories/produtoRepository');

class ProdutoService {

  async createProduto(produtoData) {
    const novoProduto = await produtoRepository.create(produtoData);
    return novoProduto;
  }

  async listProdutos() {
    return await produtoRepository.findMany();
  }

  async findProdutoById(id) {
    const produto = await produtoRepository.findById(id);
    if (!produto) {
      const error = new Error('Produto não encontrado.');
      error.statusCode = 404;
      throw error;
    }
    return produto;
  }

  async updateProduto(id, data) {
    await this.findProdutoById(id); 

    return await produtoRepository.update(id, data);
  }

  async deleteProduto(id) {
    await this.findProdutoById(id);

    await produtoRepository.delete(id);
  }
}

module.exports = new ProdutoService();