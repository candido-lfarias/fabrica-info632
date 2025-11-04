// Arquivo: src/repositories/produtoRepository.js

// No futuro, importaremos a instância do Prisma aqui.
// const prisma = require('../database'); 
const Produto = require('../models/Produto');

class ProdutoRepository {
  
  /**
   * Cria um novo produto no banco de dados.
   * @param {object} data - Dados do produto { descricao, unidade, valor }.
   * @returns {Promise<Produto>} O produto criado.
   */
  async create(data) {
    console.log('[Repository] Dados recebidos para criar produto:', data);
    // --- LÓGICA FUTURA COM PRISMA ---
    // const prismaProduto = await prisma.produto.create({ data });
    // return new Produto(prismaProduto);

    // --- DADOS MOCKADOS POR ENQUANTO ---
    const produtoMock = {
      idproduto: Math.floor(Math.random() * 1000), // ID aleatório
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return new Produto(produtoMock);
  }

  /**
   * Busca um produto pelo seu ID.
   * @param {number} id - O ID do produto.
   * @returns {Promise<Produto|null>} O produto encontrado ou null.
   */
  async findById(id) {
    console.log('[Repository] Buscando produto com ID:', id);
    // --- LÓGICA FUTURA COM PRISMA ---
    // const prismaProduto = await prisma.produto.findUnique({ where: { idproduto: id } });
    // return prismaProduto ? new Produto(prismaProduto) : null;

    // --- DADOS MOCKADOS POR ENQUANTO ---
    if (id === 999) return null; // Simula não encontrar
    const produtoMock = {
      idproduto: id,
      descricao: 'Café Especial Torrado',
      unidade: 'kg',
      valor: 85.50,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return new Produto(produtoMock);
  }

  /**
   * Lista todos os produtos.
   * @returns {Promise<Produto[]>} Uma lista de produtos.
   */
  async findMany() {
    console.log('[Repository] Listando todos os produtos');
    return [
      new Produto({ idproduto: 1, descricao: 'Café Grão Cru', unidade: 'kg', valor: 35.00, createdAt: new Date(), updatedAt: new Date() }),
      new Produto({ idproduto: 2, descricao: 'Café Torrado e Moído', unidade: 'kg', valor: 70.00, createdAt: new Date(), updatedAt: new Date() }),
    ];
  }

  /**
   * Atualiza um produto existente.
   * @param {number} id - O ID do produto a ser atualizado.
   * @param {object} data - Os novos dados do produto.
   * @returns {Promise<Produto>} O produto atualizado.
   */
  async update(id, data) {
    console.log('[Repository] Atualizando produto ID:', id, 'com dados:', data);
    const produtoMock = {
      idproduto: id,
      descricao: data.descricao || 'Café Atualizado',
      unidade: data.unidade || 'un',
      valor: data.valor || 99.99,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return new Produto(produtoMock);
  }

  /**
   * Deleta um produto pelo ID.
   * @param {number} id - O ID do produto a ser deletado.
   * @returns {Promise<void>}
   */
  async delete(id) {
    console.log('[Repository] Deletando produto com ID:', id);
    return Promise.resolve(); 
  }
}

module.exports = new ProdutoRepository();