const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const swaggerConfig = require("./docs/swagger");
const prisma = require("./database/Database"); // Importa a instância do prisma diretamente

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(express.json());
app.use("/api", routes);
swaggerConfig(app);

const startServer = async () => {
  try {
    console.log("Tentando conectar ao banco de dados...");
    await prisma.$connect();
    console.log("✅ Conexão com o banco de dados estabelecida com sucesso!");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Não foi possível conectar ao banco de dados.");
    console.error(error);
    process.exit(1);
  }
};

startServer();
