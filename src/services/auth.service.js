const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../models/user.repository");

const authService = {
  /**
   * Autentica um usuário pelo CPF e senha.
   * @param {string} cpf - O CPF do usuário.
   * @param {string} password - A senha.
   * @returns {Promise<string>} O token JWT.
   * @throws {Error} Se as credenciais forem inválidas.
   */
  login: async (cpf, password) => {
    console.log("6. Service authService.login iniciado");
    try {
      console.log("7. Chamando userRepository.findByCpf");
      const userRecord = await userRepository.findByCpf(cpf);
      console.log(
        "-> userRepository.findByCpf retornou:",
        userRecord
          ? `Usuário encontrado com idpessoa: ${userRecord.pessoa_idpessoa}`
          : "Usuário NÃO encontrado",
      );

      const user = userRecord?.usuario?.[0];
      const person = userRecord?.pessoa;

      if (!user?.senha || !person) {
        console.log(
          "-> Falha na validação: usuário, senha ou pessoa não encontrados no registro.",
        );
        throw new Error("Credenciais inválidas");
      }

      const { senha: storedPasswordHash, role, idusuario: userId } = user;
      const { nome } = person;

      console.log("-> Comparando senhas...");
      const isPasswordMatch = await bcrypt.compare(
        password,
        storedPasswordHash,
      );
      if (!isPasswordMatch) {
        console.log("-> Falha na validação: senhas não conferem.");
        throw new Error("Credenciais inválidas");
      }
      console.log("-> Senhas conferem. Gerando token JWT.");

      const payload = {
        id: userId,
        nome: nome,
        cpf: userRecord.cpf,
        role: role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      });

      return token;
    } catch (error) {
      console.error("ERRO no service:", error.message);
      // Re-lança o erro para que o controller possa tratá-lo e enviar a resposta HTTP correta.
      throw error;
    }
  },
};

module.exports = authService;
