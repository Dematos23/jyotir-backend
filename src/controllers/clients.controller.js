const ClientsService = require("../services/clients.service");

class ClientsController {
  static async post(req, res) {
    try {
      const client = await ClientsService.post(req.body);
      res.status(200).json(client);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async get(req, res) {
    try {
      const clients = await ClientsService.get(req.body);
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async put(req, res) {
    try {
      const client = await ClientsService.put(req.body);
      res.status(200).json(client);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ClientsController;
