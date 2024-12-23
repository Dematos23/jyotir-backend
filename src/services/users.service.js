const prisma = require("../utils/prisma");
const findUser = require("../utils/findUser");
const passGenerator = require("../utils/passGenerator");
const passHash = require("../../src/utils/passHash.js");

class UsersService {
  static async post(body) {
    const password = await passGenerator();
    const user = await prisma.users.create({
      data: {
        email: body.email,
        name: body.name,
        lastname: body.lastname,
        spiritualName: body.spiritualName,
        password: await passHash(password),
        role: body.role,
        state: "ACTIVO",
      },
      select: {
        email: true,
        name: true,
        lastname: true,
        spiritualName: true,
        role: true,
        state: true,
      },
    });
    user.password = password;

    return user;
  }
  static async get(body) {
    if (body.currentUserRole === "SUPER_ADMIN") {
      return await prisma.users.findMany({
        where: {
          OR: [{ role: "ADMIN" }, { role: "EXTERNO" }],
        },
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
    if (body.currentUserRole === "DEV") {
      return await prisma.users.findMany({
        where: {
          OR: [{ role: "ADMIN" }, { role: "EXTERNO" }, { role: "SUPER_ADMIN" }],
        },
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

  static async externos() {
    return await prisma.users.findMany({
      where: {
        role: "EXTERNO",
        state: "ACTIVO",
      },
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

  static async getProfile(body) {
    const user = await findUser({ id: body.currentUserId });
    const profile = {
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      spiritualName: user.spiritualName,
    };
    return profile;
  }

  static async put(body) {
    const targetUser = await findUser(body);
    return await prisma.users.update({
      where: { id: targetUser.id },
      data: {
        spiritualName: body.spiritualName,
        role: body.role,
        state: body.state,
      },
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

  static async putResetPassword(body) {
    const password = await passGenerator();
    const targetUser = await findUser(body);

    const user = await prisma.users.update({
      where: { id: targetUser.id },
      data: {
        password: await passHash(password),
      },
      select: {
        email: true,
        name: true,
        lastname: true,
        spiritualName: true,
        role: true,
        state: true,
      },
    });
    user.password = password;
    return user;
  }
  //
  static async putProfile(body) {
    const targetUser = await findUser({ email: body.currentEmail });
    return await prisma.users.update({
      where: { email: targetUser.email },
      data: {
        email: body.newEmail,
        name: body.newName,
        lastname: body.newLastname,
        password: await passHash(body.newPassword),
      },
      select: {
        email: true,
        name: true,
        lastname: true,
        spiritualName: true,
      },
    });
  }
}

module.exports = UsersService;
