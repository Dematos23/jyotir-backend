const ReservaService = require("../services/reserva.service");
const ReservaDto = require("../services/dto/reserva.dto");

class ReservaController {
  static async crear(req, res) {
    try {
      const data = ReservaDto.crear(req.body);
      const reserva = await ReservaService.crear(data);
      return res.status(201).json(reserva);
    } catch (error) {
      return res.status(400).json({
        message: "Error al crear reserva",
        content: error.message,
      });
    }
  }

  static async get(req, res) {
    try {
      const data = ReservaDto.get(req.body);
      const reservas = await ReservaService.get(data);
      return res.status(200).json(reservas);
    } catch (error) {
      return res.status(400).json({
        message: "Error al cargar las reservas",
        content: error.message,
      });
    }
  }

  static async delete(req, res){
    try {
      const data = ReservaDto.delete(req.body);
      const reserva = await ReservaService.delete(data);
      return res.status(204).json(reserva);
    } catch (error) {
      return res.status(400).json({
        message: "Error al borrar la reserva",
        content: error.message,
      })
    }
  }

  static async put(req, res) {
    try {
      const data = ReservaDto.put(req.body)
      const reserva = await ReservaService.put(data);
      return res.status(200).json(reserva);
    } catch (error) {
      return res.status(400).json({
        message: "Error al actualizar la reserva",
        content: error.message,
      })
    }
}}

module.exports = ReservaController;
