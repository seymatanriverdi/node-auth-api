const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

async function registerUser(username, password) {
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    throw new AppError("Bu username zaten var", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    password: hashedPassword
  });

  return {
    id: newUser._id,
    username: newUser.username
  };
}

async function loginUser(username, password) {
  const user = await User.findOne({ username });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Wrong password", 401);
  }

  const accessToken = jwt.sign(
    {
      id: user._id,
      username: user.username,
       role: user.role
    },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    {
    id: user._id
    },
    JWT_SECRET,
    { expiresIn: "8d" } // uzun süre
);

    user.refreshToken = refreshToken;
    await user.save();

  return {
  accessToken,
  refreshToken
};  
}

async function refreshAccessToken(refreshToken) {
  if (!refreshToken) {
    throw new AppError("Refresh token gerekli", 401);
  }

  const decoded = jwt.verify(refreshToken, JWT_SECRET);

  const user = await User.findById(decoded.id);

  if (!user || user.refreshToken !== refreshToken) {
    throw new AppError("Geçersiz refresh token", 403);
  }

  const accessToken = jwt.sign(
    {
      id: user._id,
      username: user.username,
       role: user.role
    },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  return accessToken;
}

async function logoutUser(refreshToken) {
  if (!refreshToken) {
    throw new AppError("Refresh token gerekli", 401);
  }

  const user = await User.findOne({ refreshToken });

  if (!user) {
    throw new AppError("Geçersiz refresh token", 403);
  }

  user.refreshToken = null;
  await user.save();

  return true;
}


module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser
};
