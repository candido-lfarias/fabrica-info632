const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const db = require("../models/user.model");
const emailService = require("../utils/email");

const authService = {
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
   * @param {string} token - O token de reset (não-hasheado).
   * @param {string} newPassword - A nova senha.
   * @returns {Promise<void>}
   * @throws {Error} Se o token for inválido ou expirado.
   */
  resetPassword: async (token, newPassword) => {
    // 1. Encontrar o usuário pelo token. Como armazenamos o hash,
    // precisamos iterar e comparar.
    let userFound = null;
    for (const user of db.users) {
      if (user.resetPasswordToken) {
        const isMatch = await bcrypt.compare(token, user.resetPasswordToken);
        if (isMatch) {
          userFound = user;
          break;
        }
      }
    }

    // 2. Verificar se o token é válido (usuário encontrado) E se não expirou.
    if (!userFound || userFound.resetPasswordExpires < new Date()) {
      // Mensagem de erro genérica por segurança.
      throw new Error("Token inválido ou expirado");
    }

    // 3. Hashear a nova senha
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // 4. Atualizar a senha do usuário e invalidar o token de reset
    db.updateUser(userFound.id, {
      password: newPasswordHash,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });
  },
};

module.exports = authService;
