const prisma = require("../utils/prisma");

async function findUser(user) {
  if (!user.id && !user.email) {
    return { message: "No se ha enviado id ni email" };
  }

  const where = {};
  if (user.email) {
    where.email = user.email;
  }
  if (user.id) {
    where.id = user.id;
  }

  return await prisma.users.findUnique({
    where: where,
    select: {
      id: true,
      email: true,
      name: true,
      lastname: true,
      spiritualName: true,
      role: true,
      state: true,
    },
  });
}

module.exports = findUser;
