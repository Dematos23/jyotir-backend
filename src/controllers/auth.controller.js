const AuthService = require("../services/auth.service");

async function login(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const result = await AuthService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message, message: "Error al hacer login." });
  }
}

module.exports = { login };
