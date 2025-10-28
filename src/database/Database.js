import { PrismaClient } from '@prisma/client';

class Database {
  constructor() {
    if (!Database.instance) {
      this.prisma = new PrismaClient();
      Database.instance = this;
    }
    return Database.instance;
  }

  getConnection() {
    return this.prisma;
  }

  async testConnection() {
    try {
      await this.prisma.$connect();
      console.log('Conexão com o banco de dados feita com sucesso!');
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error.message);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

const database = new Database();
Object.freeze(database);

export default database;
