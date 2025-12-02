class Customer {
  constructor({ empressa_pessoa_juridica_pessoa_idpessoa, empressa, pedido, createdAt, updatedAt }) {
    this.empressa_pessoa_juridica_pessoa_idpessoa = empressa_pessoa_juridica_pessoa_idpessoa;
    this.empressa = empressa; 
    this.pedido = pedido; 
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Customer;