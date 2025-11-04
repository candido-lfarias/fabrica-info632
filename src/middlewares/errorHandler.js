const errorHandler = (err, req, res, next) => {

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Ocorreu um erro interno no servidor.';

  console.error(err);

  // Retorna a resposta de erro padronizada
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;