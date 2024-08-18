const prisma = require("../utils/prisma");
const findUser = require("../utils/findUser");
const passGenerator = require("../utils/passGenerator");

class UsersService {
  static async post(body) {
    return await prisma.users.create({
      data: {
        email: body.email,
        name: body.name,
        lastname: body.lastname,
        spiritualName: body.spiritualName,
        password: await passGenerator(),
        role: body.role,
        state: "ACTIVO",
      },
      select: {
        email: body.email,
        name: body.name,
        lastname: body.lastname,
        spiritualName: body.spiritualName,
        password: body.password,
        role: body.role,
        state: "ACTIVO",
      },
    });
  }
  static async get(body) {
    if (body.currentUserRole === "SUPER_ADMIN") {
      return await prisma.users.findMany({
        where: {
          OR: [{ role: "ADMIN" }, { role: "EXTERNO" }],
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
    }
    if (body.currentUserRole === "DEV") {
      console.log("aqui");

      return await prisma.users.findMany({
        where: {
          OR: [{ role: "ADMIN" }, { role: "EXTERNO" }, { role: "SUPER_ADMIN" }],
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
    }
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

    // mensajes de error

    if (targetUser.state === "INACTIVO" && body.state === "INACTIVO") {
      return { message: "Usuario ya se encuentra inactivo" };
    }
    if (targetUser.state === "ACTIVO" && body.state === "ACTIVO") {
      return { message: "Usuario ya se encuentra activo" };
    }
    if (targetUser.state === "INACTIVO" && (body.spiritualName || body.role)) {
      return { message: "Usuario se encuentra inactivo" };
    }

    //   actualizaciones de usuario
    if (
      targetUser.state === "INACTIVO" &&
      body.state === "ACTIVO" &&
      !body.spiritualName &&
      !body.role
    ) {
      return await prisma.users.update({
        where: { id: targetUser.id },
        data: {
          state: body.state,
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
    }

    if (
      targetUser.state === "ACTIVO" &&
      body.state === "INACTIVO" &&
      !body.spiritualName &&
      !body.role
    ) {
      return await prisma.users.update({
        where: { id: targetUser.id },
        data: {
          state: body.state,
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
    }

    if (targetUser.state === "ACTIVO" && !body.state && (body.spiritualName || body.role)) {
      return await prisma.users.update({
        where: { id: targetUser.id },
        data: {
          spiritualName: body.spiritualName,
          role: body.role,
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
    }

    return {
      message: "La petición incumple el protocolo para modificar un usuario",
    };
  }

  static async putProfile(body) {
    const targetUser = await findUser(body);
    console.log(body);
    
    return { message: "putProfile Service" };

    // mensajes de error

    if (targetUser.state === "INACTIVO" && body.state === "INACTIVO") {
      return { message: "Usuario ya se encuentra inactivo" };
    }
    if (targetUser.state === "ACTIVO" && body.state === "ACTIVO") {
      return { message: "Usuario ya se encuentra activo" };
    }
    if (targetUser.state === "INACTIVO" && (body.spiritualName || body.role)) {
      return { message: "Usuario se encuentra inactivo" };
    }

    //   actualizaciones de usuario
    if (
      targetUser.state === "INACTIVO" &&
      body.state === "ACTIVO" &&
      !body.spiritualName &&
      !body.role
    ) {
      return await prisma.users.update({
        where: { id: targetUser.id },
        data: {
          state: body.state,
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
    }

    if (
      targetUser.state === "ACTIVO" &&
      body.state === "INACTIVO" &&
      !body.spiritualName &&
      !body.role
    ) {
      return await prisma.users.update({
        where: { id: targetUser.id },
        data: {
          state: body.state,
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
    }

    if (targetUser.state === "ACTIVO" && !body.state && (body.spiritualName || body.role)) {
      return await prisma.users.update({
        where: { id: targetUser.id },
        data: {
          spiritualName: body.spiritualName,
          role: body.role,
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
    }

    return {
      message: "La petición incumple el protocolo para modificar un usuario",
    };
  }

  static async resetPass(body) {}
}

module.exports = UsersService;
