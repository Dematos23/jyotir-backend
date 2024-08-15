const prisma = require("../utils/prisma");
const passVerify = require("../middlewares/passVerify");
const jwToken = require("../utils/jwToken");

class AuthService {
  static async login(body) {
    const user = await prisma.users.findUnique({
      where: {
        email: body.email,
      },
      select: {
        id: true,
        name: true,
        lastname: true,
        spiritualName: true,
        password: true,
        rol: true,
        state: true,
      },
    });
    if (passVerify(user.password, body.password)) {
      delete user.password;
      const token = jwToken(user);
      return { message: "Login correcto", token, user };
    } else {
      return { message: "Credenciales incorrectas" };
    }
  }
}

module.exports = AuthService;
