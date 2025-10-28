const authService = require("../services/auth.service");

/**
 * Controller para lidar com as requisições de autenticação.
 */
const authController = {
  /**
   * Lida com a requisição de login do usuário.
   * @param {object} req - O objeto de requisição do Express.
   * @param {object} res - O objeto de resposta do Express.
   */
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const token = await authService.login(username, password);
      res.status(200).json({
        message: "Login bem-sucedido!",
        token: token,
      });
    } catch (error) {
      if (error.message === "Credenciais inválidas") {
        return res.status(401).json({ message: error.message });
      }
      res
        .status(500)
        .json({ message: "Erro interno no servidor.", error: error.message });
    }
  },

  /**
   * Lida com a requisição de recuperação de senha.
   * @param {object} req - O objeto de requisição do Express.
   * @param {object} res - O objeto de resposta do Express.
   */
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      await authService.forgotPassword(email);
      res.status(200).json({
        message:
          "Se um usuário com este e-mail existir, um link de recuperação de senha foi enviado.",
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro interno no servidor.", error: error.message });
    }
  },

  /**
   * Lida com a requisição de reset de senha.
   * @param {object} req - O objeto de requisição do Express.
   * @param {object} res - O objeto de resposta do Express.
   */
  resetPassword: async (req, res) => {
    try {
      res
        .status(501)
        .json({ message: "Endpoint de resetPassword não implementado." });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro interno no servidor.", error: error.message });
    }
  },
};

module.exports = authController;
