const prisma = require('../database');

class UserRepository {
  async create(data) {
    const user = await prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }

  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id) {
    return await prisma.user.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async findManyWithFilters({ page = 1, limit = 10, name, email }) {
    const skip = (page - 1) * limit;
    const where = {
      deletedAt: null,
      AND: [],
    };

    if (name) {
      where.AND.push({ name: { contains: name, mode: 'insensitive' } });
    }
    if (email) {
      where.AND.push({ email: { contains: email, mode: 'insensitive' } });
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    return { users, total };
  }

  async update(id, data) {
    return await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        updatedAt: true,
      },
    });
  }

  async softDelete(id) {
    return await prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}

module.exports = new UserRepository();