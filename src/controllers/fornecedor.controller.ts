// backend/src/controllers/fornecedor.controller.ts

import { Request, Response } from 'express';
import { FornecedorService } from '../services/fornecedor.service';
import { createFornecedorSchema, updateFornecedorSchema } from '../validators/fornecedor.validator';

export class FornecedorController {
  private fornecedorService = new FornecedorService();

  /**
   * Lista todos os fornecedores não excluídos.
   */
  listAll = (req: Request, res: Response): void => {
    const fornecedores = this.fornecedorService.findAll();
    res.status(200).json({ success: true, data: fornecedores });
  };

  /**
   * Busca um fornecedor específico pelo ID.
   */
  findById = (req: Request, res: Response): void => {
    const { id } = req.params;
    const fornecedor = this.fornecedorService.findById(id);

    if (!fornecedor) {
      res.status(404).json({ success: false, message: 'Fornecedor não encontrado.' });
      return;
    }

    res.status(200).json({ success: true, data: fornecedor });
  };

  /**
   * Cria um novo fornecedor após validar o payload.
   */
  create = (req: Request, res: Response): void => {
    const validationResult = createFornecedorSchema.safeParse(req.body);

    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        message: 'Dados inválidos.',
        errors: validationResult.error.flatten().fieldErrors,
      });
      return;
    }

    const result = this.fornecedorService.create(validationResult.data);

    if ('error' in result) {
      // Conflito: CNPJ/CPF já existe
      res.status(409).json({ success: false, message: result.error });
      return;
    }

    res.status(201).json({ success: true, data: result });
  };

  /**
   * Atualiza um fornecedor existente após validar o payload.
   */
  update = (req: Request, res: Response): void => {
    const { id } = req.params;
    const validationResult = updateFornecedorSchema.safeParse(req.body);

    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        message: 'Dados inválidos.',
        errors: validationResult.error.flatten().fieldErrors,
      });
      return;
    }

    // Não permite enviar um body vazio
    if (Object.keys(validationResult.data).length === 0) {
        res.status(400).json({ success: false, message: 'O corpo da requisição não pode estar vazio.' });
        return;
    }

    const fornecedorAtualizado = this.fornecedorService.update(id, validationResult.data);

    if (!fornecedorAtualizado) {
      res.status(404).json({ success: false, message: 'Fornecedor não encontrado.' });
      return;
    }

    res.status(200).json({ success: true, data: fornecedorAtualizado });
  };

  /**
   * Realiza a exclusão lógica (soft delete) de um fornecedor.
   */
  softDelete = (req: Request, res: Response): void => {
    const { id } = req.params;
    const result = this.fornecedorService.softDelete(id);

    if (!result.success) {
      const statusCode = result.message.includes('encontrado') ? 404 : 400;
      res.status(statusCode).json({ success: false, message: result.message });
      return;
    }

    res.status(204).send();
  };
}