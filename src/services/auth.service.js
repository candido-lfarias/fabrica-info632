const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const db = require("../models/user.model");
const emailService = require("../utils/email");

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
    const user = db.findByUsername(username);
    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Credenciais inválidas");
    }

    const payload = {
      id: user.id,
      role: user.role,
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
    const user = db.findByEmail(email);

    if (!user) {
      return;
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(resetToken, 10);

    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 10);

    db.updateUser(user.id, {
      resetPasswordToken: hashedToken,
      resetPasswordExpires: expirationDate,
    });

    const resetURL = `http://localhost:3000/reset-password?token=${resetToken}`;
    const emailText = `Você solicitou uma redefinição de senha. Por favor, use o seguinte token para resetar sua senha. Este token é válido por 10 minutos.\n\nSeu token: ${resetToken}\n\nOu clique no link: ${resetURL}`;

    await emailService.sendEmail({
      to: user.email,
      subject: "Recuperação de Senha - Fábrica INFO632",
      text: emailText,
    });
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
