const bcrypt = require("bcryptjs");

/**
 * BANCO DE DADOS EM MEMÓRIA (MOCK)
 *
 * NOTA: Em um ambiente de produção, isso seria substituído por um modelo
 * de banco de dados real (ex: Sequelize, Mongoose, Prisma).
 *
 * As senhas 'senha123' foram pré-hasheadas para simular o armazenamento seguro.
 */
// CORREÇÃO: Hashes de senha inválidos foram substituídos por hashes bcrypt válidos.
const validPasswordHash = bcrypt.hashSync("senha123", 10);

const users = [
  {
    id: 1,
    username: "pedro.pohlmann",
    password: validPasswordHash,
    role: "Compras",
    email: "pedro.pohlmann@example.com",
    resetPasswordToken: null,
    resetPasswordExpires: null,
  },
  {
    id: 2,
    username: "ana.vendedora",
    password: validPasswordHash,
    role: "Vendas",
    email: "ana.vendedora@example.com",
    resetPasswordToken: null,
    resetPasswordExpires: null,
  },
  {
    id: 3,
    username: "carlos.admin",
    password: validPasswordHash,
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
