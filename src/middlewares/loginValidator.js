const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");
const key = process.env.JWT_SECRET;
const findUser = require("../utils/findUser");

async function loginValidator(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  function tokenDecoder(token) {
    try {
      const result = jwt.verify(token, key);
      return result;
    } catch (error) {
      return error;
    }
  }

  if (!token) {
    return res.status(403).json({ message: "Sin datos de inicio de sesión" });
  }
  const result = tokenDecoder(token);

  if (result instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const user = await findUser(result);

  if (user.state === "INACTIVO") {
    return res.status(401).json({ message: "Usuario inactivo, contacta al administrador" });
  }
  req.body.currentUserId = user.id;
  req.body.currentUserRole = user.role;
  next();
}

module.exports = loginValidator;
