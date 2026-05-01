const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError("Token gerekli", 401));
  }

  if (!authHeader.startsWith("Bearer ")) {
    return next(new AppError("Bearer token formatı yanlış", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(new AppError("Geçersiz token", 403));
  }
}

module.exports = authMiddleware;