const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestão de Produção',
      version: '1.0.0',
      description: 'Documentação da API de Gestão de Produção'
    },
    servers: [
      {
        url: '<http://localhost:3000>',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Caminho para os arquivos de rotas
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
