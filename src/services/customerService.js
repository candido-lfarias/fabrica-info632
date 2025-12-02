const customerRepository = require('../repositories/customerRepository');

class CustomerService {
  // Create customer
  async createCustomer(customerData) {
    return await customerRepository.create(customerData);
  }

  // List customers with filters
  async listCustomers({ page = 1, limit = 10 }) {
    return await customerRepository.findManyWithFilters({ page, limit });
  }

  // Find customer by ID
  async findCustomerById(id) {
    const customer = await customerRepository.findById(id);
    if (!customer) {
      const error = new Error('Customer not found.');
      error.statusCode = 404;
      throw error;
    }
    return customer;
  }

  // Update customer
  async updateCustomer(id, data) {
    return await customerRepository.update(id, data);
  }

  // Delete customer
  async deleteCustomer(id) {
    return await customerRepository.delete(id);
  }
}

module.exports = new CustomerService();
