const { PrismaClient } = require('@prisma/client');

/**
 * @type {import('@prisma/client').PrismaClient}
 */
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : [],
});

module.exports = prisma;