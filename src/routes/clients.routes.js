const { Router } = require("express");
const ClientsController = require("../controllers/clients.controller");
const loginValidator = require("../middlewares/loginValidator");
const clientCreationValidator = require("../middlewares/clientCreationValidator");

const clientsRouter = Router();

clientsRouter
  .route("/clients")
  .post(loginValidator, clientCreationValidator, ClientsController.post)
  .get(loginValidator, clientCreationValidator, ClientsController.get)
  .put(loginValidator, clientCreationValidator, ClientsController.put);

module.exports = clientsRouter;
