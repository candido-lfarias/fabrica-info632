// 1. Importar a instância Singleton do banco de dados
const database = require("../database/Database");
const prisma = require("../database/Database");

const userRepository = {
  /**
   * Encontra um usuário pelo seu CPF, incluindo dados relacionados das tabelas 'pessoa' e 'usuario'.
   * @param {string} cpf - O CPF do usuário a ser encontrado.
   * @returns {Promise<object|null>} O objeto do usuário ou null se não for encontrado.
   */
  findByCpf: async (cpf) => {
    // 2. Usar a instância compartilhada do Prisma
    const user = await prisma.pessoa_fisica.findUnique({
      where: {
        cpf: cpf,
      },
      include: {
        pessoa: true, // Inclui dados da tabela 'pessoa' (nome, e-mail, etc.)
        usuario: true, // Inclui dados da tabela 'usuario' (senha, role)
      },
    });

    return user;
  },
};

module.exports = userRepository;
