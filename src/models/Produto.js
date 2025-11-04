class Produto {
  /**
   * @param {object} data - Os dados do produto vindos do repositório.
   * @param {number} data.idproduto - O ID do produto.
   * @param {string} data.descricao - A descrição do produto.
   * @param {'un' | 'lt' | 'kg'} data.unidade - A unidade de medida.
   * @param {number} data.valor - O valor do produto.
   * @param {Date} data.createdAt - Data de criação.
   * @param {Date} data.updatedAt - Data de atualização.
   */
  constructor({ idproduto, descricao, unidade, valor, createdAt, updatedAt }) {
    this.id = idproduto;
    this.descricao = descricao;
    this.unidade = unidade;
    this.valor = valor;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Produto;