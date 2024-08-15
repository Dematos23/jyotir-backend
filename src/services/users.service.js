const prisma = require("../utils/prisma");

class UsersService {
  static async get(body) {
    const user = await prisma.users.findUnique({
      where: { id: body.userId },
      select: { id: true, role: true, state: true },
    });

    if ((user.state === "INACTIVO")) {
      return {message: "Usuario inactivo!"};
    } 

    return await prisma.users.findMany({
        where: {
            OR: [
                {role: 'ADMIN'},
                {role: 'EXTERNO'}
            ]
        },
        select: {
            email: true,
            name: true,
            lastname: true,
            spiritualName: true,
            role: true,
            state: true
        },
    });
  }
}

module.exports = UsersService;
