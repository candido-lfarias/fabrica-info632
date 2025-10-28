const authService = require("../services/auth.service");

/**
 * Controller para lidar com as requisições de autenticação.
 */
const authController = {
  /**
   * Lida com a requisição de login do usuário.
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
   */
  resetPassword: async (req, res) => {
    try {
      const { token, password } = req.body;

      // 1. Chama o service para executar a lógica de negócio
      await authService.resetPassword(token, password);

      // 2. Em caso de sucesso, envia uma resposta positiva
      res.status(200).json({ message: "Senha redefinida com sucesso." });
    } catch (error) {
      // 3. Se o service lançar um erro, captura e envia a resposta apropriada
      if (error.message === "Token inválido ou expirado") {
        return res.status(400).json({ message: error.message });
      }

      // Para qualquer outro erro inesperado
      res
        .status(500)
        .json({ message: "Erro interno no servidor.", error: error.message });
    }
  },
};

module.exports = authController;
