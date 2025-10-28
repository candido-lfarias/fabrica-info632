// Este é um middleware de validação placeholder para os testes.
// Ele tem a estrutura correta (uma função que retorna outra função),
// mas não faz nenhuma validação real. Ele apenas passa a requisição
// para o próximo passo (o controller) chamando next().

const validate = (schema) => (req, res, next) => {
  // Não faz nada, apenas continua o fluxo
  next();
};

module.exports = validate;