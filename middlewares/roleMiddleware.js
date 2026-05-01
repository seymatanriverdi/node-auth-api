const AppError = require("../utils/AppError");

function roleMiddleware(...allowedRoles) {
  return function (req, res, next) {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new AppError("Bu işlem için yetkiniz yok", 403));
    }

    next();
  };
}

module.exports = roleMiddleware;