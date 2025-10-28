// backend/src/routes/fornecedor.routes.ts
import { Router } from 'express';
import { FornecedorController } from '../controllers/fornecedor.controller';

const fornecedorRoutes = Router();
const fornecedorController = new FornecedorController();

// Mapeia a rota GET / para o método listAll do controller
fornecedorRoutes.get('/', fornecedorController.listAll);

// Mapeia a rota GET /:id para o método findById do controller
fornecedorRoutes.get('/:id', fornecedorController.findById);

// Mapeia a rota POST / para o método create do controller
fornecedorRoutes.post('/', fornecedorController.create);

fornecedorRoutes.put('/:id', fornecedorController.update);
fornecedorRoutes.delete('/:id', fornecedorController.softDelete);

export { fornecedorRoutes };