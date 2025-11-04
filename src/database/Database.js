const { PrismaClient } = require("@prisma/client");

class Database {
  constructor() {
    if (!Database.instance) {
      // Habilitar o logging de todas as queries e erros
      this.prisma = new PrismaClient({
        log: ["query", "info", "warn", "error"],
      });
      Database.instance = this;
    }
    return Database.instance;
  }
}

const singleInstance = new Database();
Object.freeze(singleInstance);

module.exports = singleInstance.prisma;
