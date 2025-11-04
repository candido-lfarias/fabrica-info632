class Produto {
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