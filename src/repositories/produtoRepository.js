const Produto = require('../models/Produto');

class ProdutoRepository {
  

  async create(data) {
    console.log('[Repository] Dados recebidos para criar produto:', data);
    const produtoMock = {
      idproduto: Math.floor(Math.random() * 1000),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return new Produto(produtoMock);
  }

  async findById(id) {
    console.log('[Repository] Buscando produto com ID:', id);
    if (id === 999) return null;
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

  async findMany() {
    console.log('[Repository] Listando todos os produtos');
    return [
      new Produto({ idproduto: 1, descricao: 'Café Grão Cru', unidade: 'kg', valor: 35.00, createdAt: new Date(), updatedAt: new Date() }),
      new Produto({ idproduto: 2, descricao: 'Café Torrado e Moído', unidade: 'kg', valor: 70.00, createdAt: new Date(), updatedAt: new Date() }),
    ];
  }

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

  async delete(id) {
    console.log('[Repository] Deletando produto com ID:', id);
    return Promise.resolve(); 
  }
}

module.exports = new ProdutoRepository();