const { Router } = require("express");
const UsersController = require("../controllers/users.controller");
const loginValidator = require("../middlewares/loginValidator");
const superAdminValidator = require("../middlewares/superAdminValidator");
const actualUserValidator = require("../middlewares/actualUserValidator");
const activeUserValidator = require("../middlewares/activeUserValidator");

const usersRouter = Router();

usersRouter
  .route("/users")
  .post(loginValidator, superAdminValidator, UsersController.post)
  .get(loginValidator, superAdminValidator, UsersController.get)
  .put(loginValidator, superAdminValidator, UsersController.put);

usersRouter
  .route("/profile")
  .get(loginValidator, UsersController.getProfile)
  .put(loginValidator, actualUserValidator, UsersController.putProfile);

usersRouter
  .route("/reset-password")
  .put(loginValidator, superAdminValidator, activeUserValidator, UsersController.putResetPassword);

  usersRouter
  .route("/externos")
  .get(loginValidator, UsersController.externos);

module.exports = usersRouter;
