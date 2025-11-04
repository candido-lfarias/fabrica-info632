// Arquivo: src/services/produtoService.js

const produtoRepository = require('../repositories/produtoRepository');

class ProdutoService {

  /**
   * Cria um novo produto.
   * @param {object} produtoData - Dados do produto { descricao, unidade, valor }.
   * @returns {Promise<Produto>} O novo produto criado.
   */
  async createProduto(produtoData) {
    // Aqui poderíamos adicionar lógicas como verificar se já existe um produto com a mesma descrição.
    // Por enquanto, vamos apenas chamar o repositório.
    const novoProduto = await produtoRepository.create(produtoData);
    return novoProduto;
  }

  /**
   * Lista todos os produtos.
   * @returns {Promise<Produto[]>} A lista de produtos.
   */
  async listProdutos() {
    return await produtoRepository.findMany();
  }

  /**
   * Busca um produto pelo seu ID.
   * @param {number} id - O ID do produto.
   * @returns {Promise<Produto>} O produto encontrado.
   * @throws {Error} Se o produto não for encontrado.
   */
  async findProdutoById(id) {
    const produto = await produtoRepository.findById(id);
    if (!produto) {
      const error = new Error('Produto não encontrado.');
      error.statusCode = 404; // Not Found
      throw error;
    }
    return produto;
  }

  /**
   * Atualiza um produto existente.
   * @param {number} id - O ID do produto.
   * @param {object} data - Os dados a serem atualizados.
   * @returns {Promise<Produto>} O produto atualizado.
   */
  async updateProduto(id, data) {
    // Primeiro, garante que o produto existe antes de tentar atualizar.
    await this.findProdutoById(id); 

    return await produtoRepository.update(id, data);
  }

  /**
   * Deleta um produto.
   * @param {number} id - O ID do produto.
   * @returns {Promise<void>}
   */
  async deleteProduto(id) {
    // Garante que o produto existe antes de tentar deletar.
    await this.findProdutoById(id);

    await produtoRepository.delete(id);
  }
}

module.exports = new ProdutoService();