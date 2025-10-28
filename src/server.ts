// src/server.ts
import express from 'express';
import cors from 'cors';
// A correção está nesta linha: adicione a extensão .ts
import { fornecedorRoutes } from './routes/fornecedor.routes'; 

const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json());

// Rota de teste para verificar se o servidor está no ar
app.get('/', (req, res) => {
  res.json({ message: 'API do Sistema de Gestão - TIME1 - Módulo Compras' });
});

// Usar as rotas com um prefixo
app.use('/api/fornecedores', fornecedorRoutes); 

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});