const { Router } = require("express");
const ReservaController = require("../controllers/users.controller");
const loginValidator = require("../middlewares/loginValidator");
const adminValidator = require("../middlewares/adminValidator");
const superAdminValidator = require("../middlewares/superAdminValidator");

const usersRouter = Router();

usersRouter
  .route("/users")
  .post(loginValidator, ReservaController.post)
  .get(loginValidator, adminValidator, ReservaController.get)
  .put(loginValidator, superAdminValidator, ReservaController.put);

module.exports = usersRouter;
