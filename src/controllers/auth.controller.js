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

      // 1. Chama o service para executar a lógica de negócio
      const token = await authService.login(username, password);

      // 2. Em caso de sucesso, envia a resposta com o token
      res.status(200).json({
        message: "Login bem-sucedido!",
        token: token,
      });
    } catch (error) {
      // 3. Se o service lançar um erro, captura e envia a resposta apropriada
      if (error.message === "Credenciais inválidas") {
        return res.status(401).json({ message: error.message });
      }

      // Para qualquer outro erro inesperado, retorna um erro de servidor
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
      res
        .status(501)
        .json({ message: "Endpoint de forgotPassword não implementado." });
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
