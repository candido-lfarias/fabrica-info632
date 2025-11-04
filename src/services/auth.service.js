const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../models/user.repository");

const authService = {
  login: async (cpf, password) => {
    const userRecord = await userRepository.findByCpf(cpf);

    // CORREÇÃO: Acessar os dados aninhados da nova estrutura da query
    const user = userRecord?.pessoa?.usuario?.[0];
    const person = userRecord?.pessoa;

    if (!user?.senha || !person) {
      throw new Error("Credenciais inválidas");
    }

    const { senha: storedPasswordHash, role, idusuario: userId } = user;
    const { nome } = person;

    const isPasswordMatch = await bcrypt.compare(password, storedPasswordHash);
    if (!isPasswordMatch) {
      throw new Error("Credenciais inválidas");
    }

    const payload = {
      id: userId,
      nome: nome,
      cpf: userRecord.cpf,
      role: role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPINRES_IN || "1h",
    });

    return token;
  },
};

module.exports = authService;
