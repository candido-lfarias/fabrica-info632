const userService = require('../services/userService');

class UserController {
  async create(req, res, next) {
    try {
      const user = await userService.createUser(req.body);
      return res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso.',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async list(req, res, next) {
    try {
      const { page = 1, limit = 10, name, email } = req.query;
      const { users, total } = await userService.listUsers({
        page: Number(page),
        limit: Number(limit),
        name,
        email,
      });

      return res.status(200).json({
        success: true,
        data: users,
        meta: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.findUserById(id);
      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updatedUser = await userService.updateUser(id, req.body);
      return res.status(200).json({
        success: true,
        message: 'Usuário atualizado com sucesso.',
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      return res.status(204).send(); // Sem conteúdo
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();