const prisma = require("../utils/prisma");
const findUser = require("../utils/findUser");

class UsersService {
  static async post(req) {
    const body = req.body;
    const currentUser = await findUser(xxx);

    if (currentUser.role === "SUPER_ADMIN" || currentUser.role === "DEV") {
      return await prisma.users.create({
        data: {
          email: body.email,
          name: body.name,
          lastname: body.lastname,
          spiritualName: body.spiritualName,
          password: body.password,
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
  }
  static async get(req) {
    // user es el que realiza la petición
    const user = await findUser(body);

    if (user.state === "INACTIVO") {
      return { message: "Tu usuario se encuentra inactivo!" };
    }

    if (user.role === "ADMIN" || user.role === "SUPER_ADMIN" || user.role === "DEV") {
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

    return { message: "No tienes permisos para realizar esta acción" };
  }

  static async put(req) {
    const body = req.body;
    const currentUser = await findUser(body);
    const targetUser = await findUser(body);

    console.log(typeof req.headers, req.headers);

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
    if (targetUser.state === "INACTIVO" && body.state === "ACTIVO" && !body.spiritualName && !body.role) {
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

    if (targetUser.state === "ACTIVO" && body.state === "INACTIVO" && !body.spiritualName && !body.role) {
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
}

module.exports = UsersService;
