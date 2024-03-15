const prisma = require("../utils/prisma");
const passVerify = require("../utils/passVerify");
const token = require("../utils/token");

class AuthService {
  static async login({ email, pass }) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        name: true,
        lastname: true,
        spiritualName: true,
        password: true,
        rol: true,
      },
      rejectOnNotFound: true,
    });
    if (passVerify(user.password, pass)) {
        const payload = token(user)
        return {message: "Login correcto", payload}
    } else{
        return {message: "Credenciales incorrectas"}
    }
  }
}

module.exports = AuthService;