const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");

function validarToken(token) {
  try {
    const resultado = jwt.verify(token, process.env.JWT_SECRET);
    return resultado;
  } catch (error) {
    return error;
  }
}

async function loginValidator(req, res, next) {
  if (!req.headers.token) {
    return res.status(403).json({ message: "Sin datos de inicio de sesión" });
  }
  const token = req.headers.token;
  const resultado = validarToken(token);
  if (resultado instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const user = await prisma.users.findUnique({
    where: { id: resultado.id },
    select: { id: true },
  });
  req.body.userId = user.id;
  next();
}

module.exports = loginValidator;
