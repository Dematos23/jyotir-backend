const prisma = require("../utils/prisma");

async function findUser(targetUser) {
  if (!targetUser.id && !targetUser.email) {
    return {message: "No se ha enviado id ni email"};
  }
  
  if (targetUser.email) {
    return await prisma.users.findUnique({
      where: { email: targetUser.email },
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

  if (targetUser.id) {
    return await prisma.users.findUnique({
      where: { id: targetUser.id },
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
