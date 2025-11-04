const authService = require("../services/auth.service");

/**
 * Controller para lidar com as requisições de autenticação.
 */
const authController = {
  login: async (req, res) => {
    console.log("4. Controller authController.login iniciado");
    try {
      const { cpf, password } = req.body;
      console.log(`5. Chamando authService.login com CPF: ${cpf}`);
      const token = await authService.login(cpf, password);

      console.log("8. authService.login retornou com sucesso. Enviando token.");
      res.status(200).json({
        message: "Login bem-sucedido!",
        token: token,
      });
    } catch (error) {
      console.error("ERRO no controller:", error.message);
      if (error.message === "Credenciais inválidas") {
        return res.status(401).json({ message: error.message });
      }
      res
        .status(500)
        .json({ message: "Erro interno no servidor.", error: error.message });
    }
  },
};

module.exports = authController;
