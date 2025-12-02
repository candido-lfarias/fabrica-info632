const fornecedorService = require('../Services/FornecedorService');
const { validateFornecedor } = require('../validators/fornecedorValidator');

class FornecedorController {
  async create(req, res) {
    try {
      const validation = validateFornecedor(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          success: false, 
          message: 'Erro de validação', 
          errors: validation.error.errors 
        });
      }

      const novoFornecedor = await fornecedorService.createFornecedor(req.body);
      return res.status(201).json({ success: true, data: novoFornecedor });

    } catch (error) {
      return res.status(error.status || 500).json({ 
        success: false, 
        message: error.message || 'Erro interno do servidor' 
      });
    }
  }

  async list(req, res) {
    try {
      const { page, limit, razao, cnpjCpf, qualificacao } = req.query;
      const result = await fornecedorService.listFornecedores(page, limit, { razao, cnpjCpf, qualificacao });
      return res.status(200).json({ success: true, ...result });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const fornecedor = await fornecedorService.getFornecedorById(req.params.id);
      return res.status(200).json({ success: true, data: fornecedor });
    } catch (error) {
      return res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      // Para update parcial, poderíamos criar um validador parcial (zod .partial())
      // Aqui vamos assumir validação básica ou reutilizar o create com cuidado
      
      const atualizado = await fornecedorService.updateFornecedor(id, req.body);
      return res.status(200).json({ success: true, data: atualizado });
    } catch (error) {
      return res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await fornecedorService.deleteFornecedor(req.params.id);
      return res.status(200).json({ success: true, message: 'Fornecedor excluído com sucesso.' });
    } catch (error) {
      return res.status(error.status || 500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new FornecedorController();