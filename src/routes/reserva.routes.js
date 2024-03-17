const { Router } = require("express");
const ReservaController = require("../controllers/reserva.controller")
// const reservaController = new ReservaController() 

const reservaRouter = Router();

reservaRouter
    .get("/req-reserva", ReservaController.get)
    .post("/req-reserva", ReservaController.crear)
    .delete("/req-reserva", ReservaController.delete)
    .put("/req-reserva", ReservaController.put)

module.exports = reservaRouter;