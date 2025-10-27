const bcrypt = require("bcryptjs");

/**
 * BANCO DE DADOS EM MEMÓRIA (MOCK)
 *
 * NOTA: Em um ambiente de produção, isso seria substituído por um modelo
 * de banco de dados real (ex: Sequelize, Mongoose, Prisma).
 *
 * A senha 'senha123' foi pré-hasheada para simular o armazenamento seguro.
 * O hash foi gerado com: bcrypt.hashSync('senha123', 10);
 */
const users = [
  {
    id: 1,
    username: "pedro.pohlmann",
    // Hash para 'senha123'
    password: "$2a$10$f/3b5S.wQ5.e/f8zJ9j8..lO3G7FzD2kO6Y.zJ9j8..lO3G7FzD2k",
    role: "Compras",
    email: "pedro.pohlmann@example.com",
    resetPasswordToken: null,
    resetPasswordExpires: null,
  },
  {
    id: 2,
    username: "ana.vendedora",
    // Hash para 'senha123'
    password: "$2a$10$f/3b5S.wQ5.e/f8zJ9j8..lO3G7FzD2kO6Y.zJ9j8..lO3G7FzD2k",
    role: "Vendas",
    email: "ana.vendedora@example.com",
    resetPasswordToken: null,
    resetPasswordExpires: null,
  },
  {
    id: 3,
    username: "carlos.admin",
    // Hash para 'senha123'
    password: "$2a$10$f/3b5S.wQ5.e/f8zJ9j8..lO3G7FzD2kO6Y.zJ9j8..lO3G7FzD2k",
    role: "Administrador",
    email: null, // Exemplo de usuário sem e-mail cadastrado
    resetPasswordToken: null,
    resetPasswordExpires: null,
  },
];

// Exportamos um objeto que simula um repositório de dados
const db = {
  users,

  findByUsername: (username) => {
    return users.find((user) => user.username === username);
  },

  findByEmail: (email) => {
    return users.find((user) => user.email === email);
  },

  findById: (id) => {
    return users.find((user) => user.id === id);
  },

  findByResetToken: (token) => {
    return users.find((user) => user.resetPasswordToken === token);
  },

  updateUser: (id, updateData) => {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return null;
    }

    users[userIndex] = { ...users[userIndex], ...updateData };
    return users[userIndex];
  },
};

module.exports = db;
