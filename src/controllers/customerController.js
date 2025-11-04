const customerService = require('../services/customerService');

class CustomerController {
  // Create customer
  async create(req, res, next) {
    try {
      const customer = await customerService.createCustomer(req.body);
      return res.status(201).json({
        success: true,
        message: 'Customer created successfully.',
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  // List customers
  async list(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const { customers, total } = await customerService.listCustomers({ page, limit });

      return res.status(200).json({
        success: true,
        data: customers,
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

  // Get customer by ID
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const customer = await customerService.findCustomerById(id);
      return res.status(200).json({
        success: true,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update customer
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updatedCustomer = await customerService.updateCustomer(id, req.body);
      return res.status(200).json({
        success: true,
        message: 'Customer updated successfully.',
        data: updatedCustomer,
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete customer
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await customerService.deleteCustomer(id);
      return res.status(204).send(); // No content
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CustomerController();
