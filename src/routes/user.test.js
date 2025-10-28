
const request = require('supertest');
const app = require('../index'); // Importe seu app Express principal
const userRepository = require('../repositories/userRepository'); // Importe o repositório que vamos mockar

// Aqui está a mágica! Dizemos ao Jest para substituir o userRepository por um mock.
jest.mock('../repositories/userRepository');

// Vamos limpar os mocks após cada teste para que um não interfira no outro
afterEach(() => {
  jest.clearAllMocks();
});

describe('CRUD de Usuários API', () => {

  // --- Teste para a Rota de Criação (POST /api/usuarios) ---
  describe('POST /api/usuarios', () => {
    
    it('deve criar um novo usuário e retornar status 201', async () => {
      const newUserPayload = {
        name: 'Usuário Teste',
        email: 'teste@exemplo.com',
        password: 'senha123',
      };

      const createdUser = { id: 'uuid-fake-123', ...newUserPayload };
      delete createdUser.password; // A senha nunca é retornada

      // 1. ARRANGE (Preparar): Configuramos o comportamento do nosso mock.
      // Dizemos que findByEmail deve retornar null (e-mail não existe).
      userRepository.findByEmail.mockResolvedValue(null);
      // Dizemos que create deve retornar o usuário que esperamos.
      userRepository.create.mockResolvedValue(createdUser);

      // 2. ACT (Agir): Fazemos a requisição para a nossa API.
      const response = await request(app)
        .post('/api/usuarios')
        .send(newUserPayload);

      // 3. ASSERT (Verificar): Checamos se o resultado está correto.
      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.email).toBe(newUserPayload.email);
      expect(response.body.data.password).toBeUndefined(); // Garante que a senha não foi exposta!
    });

    it('deve retornar erro 409 se o e-mail já existir', async () => {
      const newUserPayload = {
        name: 'Usuário Teste',
        email: 'existente@exemplo.com',
        password: 'senha123',
      };

      // 1. ARRANGE: Simulamos que o e-mail já existe no banco.
      userRepository.findByEmail.mockResolvedValue({ id: 'id-existente', email: 'existente@exemplo.com' });

      // 2. ACT
      const response = await request(app)
        .post('/api/usuarios')
        .send(newUserPayload);

      // 3. ASSERT
      expect(response.statusCode).toBe(409); // 409 Conflict
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Este e-mail já está em uso.');
    });
  });

  // --- Teste para a Rota de Busca por ID (GET /api/usuarios/:id) ---
  describe('GET /api/usuarios/:id', () => {

    it('deve retornar um usuário e status 200 se o ID existir', async () => {
      const fakeUser = {
        id: 'uuid-valido-123',
        name: 'Usuário Encontrado',
        email: 'encontrado@exemplo.com'
      };

      // 1. ARRANGE: Simulamos que o findById encontra o usuário.
      userRepository.findById.mockResolvedValue(fakeUser);

      // 2. ACT
      const response = await request(app).get(`/api/usuarios/${fakeUser.id}`);

      // 3. ASSERT
      expect(response.statusCode).toBe(200);
      expect(response.body.data.id).toBe(fakeUser.id);
    });

    it('deve retornar erro 404 se o ID não existir', async () => {
      const nonExistentId = 'uuid-invalido-456';

      // 1. ARRANGE: Simulamos que o findById não encontra nada (retorna null).
      userRepository.findById.mockResolvedValue(null);

      // 2. ACT
      const response = await request(app).get(`/api/usuarios/${nonExistentId}`);

      // 3. ASSERT
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Usuário não encontrado.');
    });
  });

});