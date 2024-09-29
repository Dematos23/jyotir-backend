const ReservationsService = require("../services/reservations.service");
const ReservationsDto = require("./dtos/reservations.dto");

class ReservationsController {
  static async post(req, res) {
    try {
      
      const data = ReservationsDto.post(req.body);
      
      const reservation = await ReservationsService.post(data);
      return res.status(201).json(reservation);
    } catch (error) {
      return res.status(400).json({
        message: "Error al crear reserva",
        content: error.message,
      });
    }
  }

  static async get(req, res) {
    try {
      const data = ReservationsDto.get(req.body);
      const rawReservations = await ReservationsService.get(data);
      const cleanReservations = ReservationsDto.format(rawReservations);
      return res.status(200).json(cleanReservations);
    } catch (error) {
      return res.status(400).json({
        message: "Error al cargar las reservas",
        content: error.message,
      });
    }
  }
  static async getEval(req, res) {
    try {
      const data = ReservationsDto.get(req.body);
      const reservas = await ReservationsService.getEval(data);
      return res.status(200).json(reservas);
    } catch (error) {
      return res.status(400).json({
        message: "Error al cargar las reservas",
        content: error.message,
      });
    }
  }

  static async put(req, res) {
    try {
      const data = ReservationsDto.put(req.body);
      const reserva = await ReservationsService.put(data);
      return res.status(200).json(reserva);
    } catch (error) {
      return res.status(400).json({
        message: "Error al actualizar la reserva",
        content: error.message,
      });
    }
  }
  static async putEval(req, res) {
    try {
      const data = ReservationsDto.putEval(req.body);
      const reserva = await ReservationsService.putEval(data);
      return res.status(200).json(reserva);
    } catch (error) {
      return res.status(400).json({
        message: "Error al actualizar la reserva",
        content: error.message,
      });
    }
  }
}

module.exports = ReservationsController;
