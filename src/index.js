const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const swaggerConfig = require("./docs/swagger");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON - REATIVADO
app.use(express.json());

// Rotas
app.use("/api", routes);

// Swagger
swaggerConfig(app);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
