const prisma = require('../database/Database');  // Importando o Prisma Client
const User = require('../models/User');  // Importando o modelo User

class UserRepository {
  // Criação de um novo usuário
  async create(data) {
    try {
      const prismaUser = await prisma.user.create({
        data,
      });
      return new User(prismaUser);  // Retornando a instância de User
    } catch (error) {
      console.error('Erro ao criar usuário:', error.message);
      throw new Error('Erro ao criar usuário');
    }
  }

  // Encontrar um usuário pelo e-mail
  async findByEmail(email) {
    try {
      return await prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      console.error('Erro ao buscar usuário por email:', error.message);
      throw new Error('Erro ao buscar usuário por email');
    }
  }

  // Encontrar um usuário pelo ID
  async findById(id) {
    try {
      const prismaUser = await prisma.user.findFirst({
        where: { id, deletedAt: null },  // Garante que o usuário não tenha sido deletado
      });

      return prismaUser ? new User(prismaUser) : null;  // Retorna um User ou null
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error.message);
      throw new Error('Erro ao buscar usuário por ID');
    }
  }

  // Encontrar múltiplos usuários com filtros
  async findManyWithFilters({ page = 1, limit = 10, name, email }) {
    try {
      const skip = (page - 1) * limit;
      const where = { deletedAt: null, AND: [] };

      // Adicionando filtros de busca, caso existam
      if (name) where.AND.push({ name: { contains: name, mode: 'insensitive' } });
      if (email) where.AND.push({ email: { contains: email, mode: 'insensitive' } });

      // Realizando as consultas
      const [prismaUsers, total] = await Promise.all([
        prisma.user.findMany({ where, skip, take: limit }),
        prisma.user.count({ where }),
      ]);

      // Convertendo os usuários para instâncias de User
      const users = prismaUsers.map(user => new User(user));

      return { users, total };  // Retorna os usuários e o total de usuários encontrados
    } catch (error) {
      console.error('Erro ao buscar usuários com filtros:', error.message);
      throw new Error('Erro ao buscar usuários com filtros');
    }
  }

  // Atualizar um usuário
  async update(id, data) {
    try {
      const prismaUser = await prisma.user.update({
        where: { id },
        data,
      });
      return new User(prismaUser);  // Retorna a instância de User com os dados atualizados
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error.message);
      throw new Error('Erro ao atualizar usuário');
    }
  }

  // Realizar soft delete de um usuário
  async softDelete(id) {
    try {
      return await prisma.user.update({
        where: { id },
        data: { deletedAt: new Date() },  // Marca a data de exclusão sem remover o registro
      });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error.message);
      throw new Error('Erro ao deletar usuário');
    }
  }
}

module.exports = new UserRepository();  // Exportando a instância do UserRepository
