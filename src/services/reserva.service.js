const prisma = require("../utils/prisma");

class ReservaService {
  static async crear(data) {
    const reserva = await prisma.reserva.create({
      data: data,
    });
    return reserva;
  }

  static async get(data) {
    const reservas = await prisma.reserva.findMany({
      where: { id: data.id },
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
  }
}

module.exports = ReservaService;
