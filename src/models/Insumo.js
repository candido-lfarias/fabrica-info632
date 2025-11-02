class Insumo {
  /**
   * @param {object} data
   * @param {number} data.idinsumo
   * @param {string} data.descricao
   * @param {'un' | 'lt' | 'kg' | null} data.unidade
   */
  constructor({ idinsumo, descricao, unidade }) {
    this.id = idinsumo;
    this.descricao = descricao;
    this.unidade = unidade;
  }
}

module.exports = Insumo;