const prisma = require('../../database'); 
const User = require('../models/User');

class UserRepository {
  async create(data) {
    const prismaUser = await prisma.user.create({
      data,
    });
    return new User(prismaUser);
  }

  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id) {
    const prismaUser = await prisma.user.findFirst({
      where: { id, deletedAt: null },
    });

    return prismaUser ? new User(prismaUser) : null;
  }

  async findManyWithFilters({ page = 1, limit = 10, name, email }) {
    const skip = (page - 1) * limit;
    const where = { deletedAt: null, AND: [] };
    if (name) where.AND.push({ name: { contains: name, mode: 'insensitive' } });
    if (email) where.AND.push({ email: { contains: email, mode: 'insensitive' } });

    const [prismaUsers, total] = await Promise.all([
      prisma.user.findMany({ where, skip, take: limit }),
      prisma.user.count({ where }),
    ]);

    const users = prismaUsers.map(user => new User(user));

    return { users, total };
  }

  async update(id, data) {
    const prismaUser = await prisma.user.update({
      where: { id },
      data,
    });
    return new User(prismaUser);
  }

  async softDelete(id) {
    return await prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

module.exports = new UserRepository();