const {
  getUserProfile,
  getAllUsers
} = require("../services/userService");

async function getProfile(req, res, next) {
  try {
    const user = await getUserProfile(req.user.id);

    res.json({
      message: "Protected route çalıştı",
      user
    });
  } catch (error) {
    next(error);
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await getAllUsers();

    res.json(users);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProfile,
  getUsers
};