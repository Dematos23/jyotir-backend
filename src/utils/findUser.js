const prisma = require("../utils/prisma");

async function findUser(user) {
  if (!user.id && !user.email) {
    return {message: "No se ha enviado id ni email"};
  }
  
  if (user.email) {
    return await prisma.users.findUnique({
      where: { email: user.email },
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

  if (user.id) {
    return await prisma.users.findUnique({
      where: { id: user.id },
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

}

module.exports = findUser;
