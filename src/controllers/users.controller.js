const UsersService = require("../services/users.service");

class UsersController {
  static async post(req, res) {
    try {
      const user = await UsersService.post(req);
      resstatus(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async get(req, res) {
    try {
      const users = await UsersService.get(req);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async put(req, res) {
    try {
      const user = await UsersService.put(req);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UsersController;
