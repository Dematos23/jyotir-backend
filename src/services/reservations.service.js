const prisma = require("../utils/prisma");

class ReservationsService {
  static async post(data) {
    // const reservation = await prisma.reserva.create({
    //   data: data,
    // });
const reservation = {message: "Reservations Service"}
    return reservation;
  }

  static async get(data) {
    const reservas = await prisma.reserva.findMany({
      where: { userId: data.userId },
    });
    return reservas;
  }

  static async delete(data) {
    const reserva = await prisma.reserva.delete({
      where: { id: data.id },
    });
    return reserva;
  }

  static async put(data){
    const reserva = await prisma.reserva.update({
      where:{ id: data[0].id},
      data: data[1]
    })
    return reserva;
  }
}

module.exports = ReservationsService;
