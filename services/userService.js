const User = require("../models/User");
const AppError = require("../utils/AppError");

async function getUserProfile(userId) {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
}


async function getAllUsers() {
  const users = await User.find().select("-password");
  return users;
}

module.exports = {
  getUserProfile,
  getAllUsers
};