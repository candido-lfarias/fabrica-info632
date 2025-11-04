const prisma = require('../database/Database'); 
const Customer = require('../models/Customer');

class CustomerRepository {
  async create(data) {
    const prismaCustomer = await prisma.customer.create({
      data,
    });
    return new Customer(prismaCustomer);
  }

  async findById(id) {
    const prismaCustomer = await prisma.customer.findUnique({
      where: { empressa_pessoa_juridica_pessoa_idpessoa: id },
      include: {
        empressa: true, 
        pedido: true,
      },
    });
    return prismaCustomer ? new Customer(prismaCustomer) : null;
  }

  async findManyWithFilters({ page = 1, limit = 10 }) {
    const skip = (page - 1) * limit;
    const customers = await prisma.customer.findMany({
      skip,
      take: limit,
      include: {
        empressa: true,
        pedido: true,
      },
    });
    const total = await prisma.customer.count();
    return { customers, total };
  }

  async update(id, data) {
    const prismaCustomer = await prisma.customer.update({
      where: { empressa_pessoa_juridica_pessoa_idpessoa: id },
      data,
    });
    return new Customer(prismaCustomer);
  }

  async delete(id) {
    return await prisma.customer.delete({
      where: { empressa_pessoa_juridica_pessoa_idpessoa: id },
    });
  }
}

module.exports = new CustomerRepository();
