function errorMiddleware(err, req, res, next) {
  console.error("Global error:", err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Sunucu hatası"
  });
}

module.exports = errorMiddleware;