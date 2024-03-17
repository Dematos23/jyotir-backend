const prisma = require("../utils/prisma");
const passVerify = require("../utils/passVerify");
const token = require("../utils/token");

class AuthService {
  static async login(body) {
    const user = await prisma.user.findUnique({
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
      },
    });
    
    if (passVerify(user.password, body.password)) {
      const payload = token(user);
      return { message: "Login correcto", payload };
    } else {
      return { message: "Credenciales incorrectas" };
    }
  }
}

module.exports = AuthService;
