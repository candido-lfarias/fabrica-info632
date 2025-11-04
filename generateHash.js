const bcrypt = require("bcrypt");
const password = "senha123";
const saltRounds = 10;

const hash = bcrypt.hashSync(password, saltRounds);

console.log("Senha original:", password);
console.log("Hash gerado:", hash);
