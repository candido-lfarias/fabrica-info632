const request = require('supertest');
const app = require('../index'); // Import your main Express app
const prisma = require('../database/Database'); 

// Clean up the database after each test
afterEach(async () => {
  await prisma.customer.deleteMany(); // Deletes all customers to keep the test environment clean
});

describe('Customers API', () => {

  // Testing customer creation
  describe('POST /customers', () => {
    it('should create a new customer and return status 201', async () => {
      const customerData = {
        nome: 'Carlos Silva',
        email: 'carlos@aucaramelo.com',
        telefone: '123456789',
      };

      const response = await request(app)
        .post('/api/customers')
        .send(customerData);

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('empressa_pessoa_juridica_pessoa_idpessoa');
      expect(response.body.data.nome).toBe(customerData.nome);
      expect(response.body.data.email).toBe(customerData.email);
      expect(response.body.data.telefone).toBe(customerData.telefone);
    });

    it('should return error 409 if the customer already exists', async () => {
      const customerData = {
        nome: 'Carlos Silva',
        email: 'carlos@aucaramelo.com',
        telefone: '123456789',
      };

      // Create a customer for the duplication test
      await request(app).post('/api/customers').send(customerData);

      const response = await request(app)
        .post('/api/customers')
        .send(customerData);

      expect(response.statusCode).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Customer already exists');
    });
  });

  // Testing listing customers
  describe('GET /customers', () => {
    it('should list all customers', async () => {
      // Create two customers for the test
      const customerData1 = { nome: 'Carlos Silva', email: 'carlos@aucaramelo.com', telefone: '123456789' };
      const customerData2 = { nome: 'Isadora Lima', email: 'isadora@aucaramelo.com', telefone: '987654321' };

      await request(app).post('/api/customers').send(customerData1);
      await request(app).post('/api/customers').send(customerData2);

      const response = await request(app).get('/api/customers');

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2); // Expecting 2 customers
    });
  });

  // Testing getting customer by ID
  describe('GET /customers/:id', () => {
    it('should return a customer by ID', async () => {
      const customerData = { nome: 'Carlos Silva', email: 'carlos@aucaramelo.com', telefone: '123456789' };
      const createResponse = await request(app).post('/api/customers').send(customerData);

      const customerId = createResponse.body.data.empressa_pessoa_juridica_pessoa_idpessoa;

      const response = await request(app).get(`/api/customers/${customerId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('empressa_pessoa_juridica_pessoa_idpessoa');
      expect(response.body.data.nome).toBe(customerData.nome);
    });

    it('should return error 404 if the customer is not found', async () => {
      const invalidId = '999999'; // Non-existent ID

      const response = await request(app).get(`/api/customers/${invalidId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Customer not found');
    });
  });

  // Testing updating a customer
  describe('PUT /customers/:id', () => {
    it('should update a customer\'s data', async () => {
      const customerData = { nome: 'Carlos Silva', email: 'carlos@aucaramelo.com', telefone: '123456789' };
      const createResponse = await request(app).post('/api/customers').send(customerData);
      const customerId = createResponse.body.data.empressa_pessoa_juridica_pessoa_idpessoa;

      const updatedData = { nome: 'Carlos Silva Junior', email: 'carlosjunior@aucaramelo.com', telefone: '987654321' };

      const response = await request(app)
        .put(`/api/customers/${customerId}`)
        .send(updatedData);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.nome).toBe(updatedData.nome);
      expect(response.body.data.email).toBe(updatedData.email);
      expect(response.body.data.telefone).toBe(updatedData.telefone);
    });

    it('should return error 404 if the customer is not found', async () => {
      const invalidId = '999999'; // Non-existent ID
      const updatedData = { nome: 'Carlos Silva Junior', email: 'carlosjunior@aucaramelo.com', telefone: '987654321' };

      const response = await request(app)
        .put(`/api/customers/${invalidId}`)
        .send(updatedData);

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Customer not found');
    });
  });

  // Testing deleting a customer
  describe('DELETE /customers/:id', () => {
    it('should delete a customer', async () => {
      const customerData = { nome: 'Carlos Silva', email: 'carlos@aucaramelo.com', telefone: '123456789' };
      const createResponse = await request(app).post('/api/customers').send(customerData);
      const customerId = createResponse.body.data.empressa_pessoa_juridica_pessoa_idpessoa;

      const response = await request(app).delete(`/api/customers/${customerId}`);

      expect(response.statusCode).toBe(204); // No content
    });

    it('should return error 404 if the customer is not found', async () => {
      const invalidId = '999999'; // Non-existent ID

      const response = await request(app).delete(`/api/customers/${invalidId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Customer not found');
    });
  });
});
