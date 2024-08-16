const { Router } = require("express");
const ReservaController = require("../controllers/reserva.controller")
const loginValidator = require("../middlewares/loginValidator")

const reservaRouter = Router();

reservaRouter
    .route("/req-reserva")
    .get(loginValidator,ReservaController.get)
    .post(loginValidator, ReservaController.crear)
    .put(loginValidator, ReservaController.put)

module.exports = reservaRouter;