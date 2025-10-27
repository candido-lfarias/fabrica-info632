const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/user.model");

/**
 * Lida com a lógica de negócio para autenticação.
 */
const authService = {
  /**
   * Autentica um usuário e retorna um token JWT.
   * @param {string} username - O nome de usuário.
   * @param {string} password - A senha.
   * @returns {Promise<string>} O token JWT.
   */
  login: async (username, password) => {
    // A implementação completa virá nas próximas etapas.
    // Por enquanto, esta é a estrutura.
    throw new Error("Função login não implementada.");
  },

  /**
   * Inicia o processo de recuperação de senha.
   * @param {string} email - O email do usuário.
   * @returns {Promise<void>}
   */
  forgotPassword: async (email) => {
    // A implementação completa virá nas próximas etapas.
    throw new Error("Função forgotPassword não implementada.");
  },

  /**
   * Reseta a senha do usuário usando um token.
   * @param {string} token - O token de reset.
   * @param {string} newPassword - A nova senha.
   * @returns {Promise<void>}
   */
  resetPassword: async (token, newPassword) => {
    // A implementação completa virá nas próximas etapas.
    throw new Error("Função resetPassword não implementada.");
  },
};

module.exports = authService;
