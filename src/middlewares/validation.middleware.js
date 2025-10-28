const Joi = require("joi");

// Schema de validação para o corpo da requisição de login
const loginSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.base": `"username" deve ser do tipo texto`,
    "string.empty": `"username" não pode ser vazio`,
    "string.min": `"username" deve ter no mínimo {#limit} caracteres`,
    "string.max": `"username" deve ter no máximo {#limit} caracteres`,
    "any.required": `"username" é um campo obrigatório`,
  }),
  password: Joi.string().required().messages({
    "string.base": `"password" deve ser do tipo texto`,
    "string.empty": `"password" não pode ser vazio`,
    "any.required": `"password" é um campo obrigatório`,
  }),
});

// Schema de validação para a requisição de recuperação de senha
const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": `"email" deve ser do tipo texto`,
    "string.empty": `"email" não pode ser vazio`,
    "string.email": `"email" deve ser um endereço de e-mail válido`,
    "any.required": `"email" é um campo obrigatório`,
  }),
});

// NOVO: Schema de validação para a requisição de reset de senha
const resetPasswordSchema = Joi.object({
  token: Joi.string().hex().length(64).required().messages({
    "string.base": `"token" deve ser do tipo texto`,
    "string.hex": `"token" deve ser um token hexadecimal válido`,
    "string.length": `"token" deve ter exatamente {#limit} caracteres`,
    "any.required": `"token" é um campo obrigatório`,
  }),
  password: Joi.string().min(8).required().messages({
    "string.base": `"password" deve ser do tipo texto`,
    "string.min": `"password" deve ter no mínimo {#limit} caracteres`,
    "any.required": `"password" é um campo obrigatório`,
  }),
  passwordConfirmation: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": `"passwordConfirmation" deve ser igual a "password"`,
      "any.required": `"passwordConfirmation" é um campo obrigatório`,
    }),
});

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateForgotPassword = (req, res, next) => {
  const { error } = forgotPasswordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// NOVO: Middleware para validar o corpo da requisição de reset de senha
const validateResetPassword = (req, res, next) => {
  const { error } = resetPasswordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateLogin,
  validateForgotPassword,
  validateResetPassword, // Exportar a nova função
};
