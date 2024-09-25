const prisma = require("../utils/prisma");

class ReservationsService {
  static async post(data) {
    // const { name, startTime, endTime, implementos, office, state, userIds, clientIds } = data;
    const reservation = await prisma.reservations.create({
      data: {
        name: data.name,
        startTime: data.startTime,
        endTime: data.endTime,
        implementos: data.implementos,
        office: data.office,
        state: data.state,
        users: {
          connect: data.userIds.map((userId) => ({ id: userId })),
        },
        clients: {
          connect: data.clientIds.map((clientId) => ({ id: clientId })),
        },
      },
      select: {
        id: true,
        name: true,
        startTime: true,
        endTime: true,
        implementos: true,
        observation: true,
        office: true,
        state: true,
      },
    });
    return reservation;
  }

  static async get(data) {
    const { currentUserId } = data;

    return await prisma.reservations.findMany({
      where: {
        users: {
          some: {
            id: currentUserId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        startTime: true,
        endTime: true,
        implementos: true,
        observation: true,
        office: true,
        state: true,
        clients: true,
        users: true
      },
    });
  }
  static async getEval(data) {
    return await prisma.reservations.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        startTime: true,
        endTime: true,
        implementos: true,
        observation: true,
        office: true,
        state: true,
        users: true,
        clients: true,
      },
    });
  }

  static async put(data) {
    const reservation = await prisma.reservations.update({
      where: { id: data[0].id },
      data: data[1],
    });
    return reservation;
  }

  static async putEval(data) {
    const reserva = await prisma.reservations.update({
      where: { id: data.reservationId },
      data: {
        state: data.state,
        office: data.office,
        observation: data.observation,
      },
    });
    return reserva;
  }
}

module.exports = ReservationsService;
