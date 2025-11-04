const Joi = require("joi");

// Schema de validação para o corpo da requisição de login, agora com CPF
const loginSchema = Joi.object({
  // TODO: Implementar uma validação de CPF mais robusta que verifique os dígitos verificadores.
  // A validação atual apenas checa o formato (11 dígitos numéricos).
  cpf: Joi.string()
    .pattern(/^[0-9]+$/)
    .length(11)
    .required()
    .messages({
      "string.base": `"cpf" deve ser do tipo texto`,
      "string.empty": `"cpf" não pode ser vazio`,
      "string.pattern.base": `"cpf" deve conter apenas números`,
      "string.length": `"cpf" deve ter exatamente {#limit} caracteres`,
      "any.required": `"cpf" é um campo obrigatório`,
    }),
  password: Joi.string().required().messages({
    "string.base": `"password" deve ser do tipo texto`,
    "string.empty": `"password" não pode ser vazio`,
    "any.required": `"password" é um campo obrigatório`,
  }),
});

/**
 * Middleware para validar o corpo da requisição de login.
 */
const validateLogin = (req, res, next) => {
  console.log("2. Middleware validateLogin iniciado");
  const { error } = loginSchema.validate(req.body);
  if (error) {
    console.error("ERRO de validação:", error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }
  console.log("3. Middleware validateLogin concluído com sucesso");
  next();
};

module.exports = {
  validateLogin,
};
