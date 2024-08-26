const { Router } = require("express");
const ReservationsController = require("../controllers/reservations.controller");
const loginValidator = require("../middlewares/loginValidator");
const externoValidator = require("../middlewares/externoValidator");
const adminValidator = require("../middlewares/adminValidator");

const reservationsRouter = Router();

reservationsRouter
  .route("/reservations")
  .post(loginValidator, externoValidator, ReservationsController.post)
  .get(loginValidator, externoValidator, ReservationsController.get)
  // .put(loginValidator, externoValidator, ReservationsController.put);

reservationsRouter
  .route("/reservationsEval")
  .get(loginValidator, adminValidator, ReservationsController.getEval)
  .put(loginValidator, adminValidator, ReservationsController.putEval);

module.exports = reservationsRouter;
