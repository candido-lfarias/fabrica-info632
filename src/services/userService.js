const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');

class UserService {
  async createUser(userData) {
    const emailExists = await userRepository.findByEmail(userData.email);
    if (emailExists) {
      const error = new Error('Este e-mail já está em uso.');
      error.statusCode = 409; // Conflito
      throw error;
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return newUser;
  }

  async listUsers(filters) {
    const { users, total } = await userRepository.findManyWithFilters(filters);
    return { users, total };
  }

  async findUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      const error = new Error('Usuário não encontrado.');
      error.statusCode = 404; // Não encontrado
      throw error;
    }
    return user;
  }

  async updateUser(id, data) {
    await this.findUserById(id); // Garante que o usuário existe

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return await userRepository.update(id, data);
  }

  async deleteUser(id) {
    await this.findUserById(id); // Garante que o usuário existe
    await userRepository.softDelete(id);
  }
}

module.exports = new UserService();