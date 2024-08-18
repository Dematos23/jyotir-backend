const { Router } = require("express");
const ReservaController = require("../controllers/users.controller");
const loginValidator = require("../middlewares/loginValidator");
const adminValidator = require("../middlewares/adminValidator");
const superAdminValidator = require("../middlewares/superAdminValidator");
const actualUserValidator = require("../middlewares/actualUserValidator");

const usersRouter = Router();

usersRouter
  .route("/users")
  .post(loginValidator, ReservaController.post)
  .get(loginValidator, adminValidator, ReservaController.get)
  .put(loginValidator, superAdminValidator, ReservaController.put);

usersRouter
  .route("/profile")
  .get(loginValidator, ReservaController.getProfile)
  .put(loginValidator, actualUserValidator, ReservaController.putProfile);

module.exports = usersRouter;
