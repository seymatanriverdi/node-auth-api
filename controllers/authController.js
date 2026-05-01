const {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser
} = require("../services/authService");


async function register(req, res, next) {
  try {
    const { username, password } = req.body;

    const user = await registerUser(username, password);

    res.status(201).json({
      message: "User registered",
      user
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    const { accessToken, refreshToken } = await loginUser(username, password);

    res.json({
        message: "Login successful",
        accessToken,
        refreshToken
    });

    res.json({
      message: "Login successful",
      token
    });
  } catch (error) {
    next(error);
  }
}

async function refreshToken(req, res, next) {
  try {
    const { refreshToken } = req.body;

    const accessToken = await refreshAccessToken(refreshToken);

    res.json({
      accessToken
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    const { refreshToken } = req.body;

    await logoutUser(refreshToken);

    res.json({
      message: "Logout successful"
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  refreshToken,
  logout
};