const UsersService = require("../services/users.service");

class UsersController {
    static async get(req, res) {
        try {
            const users = await UsersService.get(req.body);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UsersController;