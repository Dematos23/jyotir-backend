const { Router } = require("express");
const ReservationsController = require("../controllers/reservations.controller");
const loginValidator = require("../middlewares/loginValidator");
const externoValidator = require("../middlewares/externoValidator");

const reservationsRouter = Router();

reservationsRouter
  .route("/reservations")
  .post(loginValidator, externoValidator, ReservationsController.crear)
  .get(loginValidator, externoValidator, ReservationsController.get)
  .put(loginValidator, externoValidator, ReservationsController.put);

module.exports = reservationsRouter;
