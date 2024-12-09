const AuthService = require("../services/auth.service");

async function login(req, res) {
  try {
    const result = await AuthService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({
        error: error.message,
        message: "Controller Error al hacer login",
      });
  }
}

module.exports = { login };
