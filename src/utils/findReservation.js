const prisma = require("./prisma");

async function findReservation(reservationId) {
  if (!reservationId) {
    return { message: "No se ha enviado reservation id" };
  }

  return await prisma.reservations.findUnique({
    where: {
      id: reservationId,
    },
    include: {
      users: true,
      clients: true,
    },
  });
}

module.exports = findReservation;
