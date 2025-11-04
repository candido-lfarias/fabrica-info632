const prisma = require("../database/Database");

const userRepository = {
  /**
   * Encontra um usuário pelo seu CPF, incluindo dados relacionados das tabelas 'pessoa' e 'usuario'.
   * @param {string} cpf - O CPF do usuário a ser encontrado.
   * @returns {Promise<object|null>} O objeto do usuário ou null se não for encontrado.
   */
  findByCpf: async (cpf) => {
    const user = await prisma.pessoa_fisica.findFirst({
      where: {
        cpf: cpf,
      },
      // CORREÇÃO: Aninhar o 'include' para seguir o relacionamento correto
      // pessoa_fisica -> pessoa -> usuario
      include: {
        pessoa: {
          include: {
            usuario: true,
          },
        },
      },
    });

    return user;
  },
};

module.exports = userRepository;
