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
   * @throws {Error} Se as credenciais forem inválidas.
   */
  login: async (username, password) => {
    // 1. Buscar o usuário no nosso "banco de dados"
    const user = db.findByUsername(username);
    if (!user) {
      // Medida de segurança: não informe se foi o usuário ou a senha que errou.
      // Isso previne ataques de "enumeração de usuários".
      throw new Error("Credenciais inválidas");
    }

    // 2. Comparar a senha enviada com o hash armazenado
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      // Mesma mensagem de erro genérica pela mesma razão de segurança.
      throw new Error("Credenciais inválidas");
    }

    // 3. Se as credenciais estiverem corretas, gerar o token JWT
    const payload = {
      id: user.id,
      role: user.role, // Incluir o perfil (role) é crucial para o RBAC (RT-02)
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return token;
  },

  /**
   * Inicia o processo de recuperação de senha.
   * @param {string} email - O email do usuário.
   * @returns {Promise<void>}
   */
  forgotPassword: async (email) => {
    throw new Error("Função forgotPassword não implementada.");
  },

  /**
   * Reseta a senha do usuário usando um token.
   * @param {string} token - O token de reset.
   * @param {string} newPassword - A nova senha.
   * @returns {Promise<void>}
   */
  resetPassword: async (token, newPassword) => {
    throw new Error("Função resetPassword não implementada.");
  },
};

module.exports = authService;
