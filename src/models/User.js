class User {
  constructor({ id, name, email, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = User;