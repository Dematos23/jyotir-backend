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
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "Sin datos de inicio de sesión" });
  }

  //   const token = req.headers.authorization.split(" ")[1];
  const token = req.headers.authorization;
  const resultado = validarToken(token);
  console.log(resultado);
  if (resultado instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const user = await prisma.user.findUnique({
    where: { id: resultado.id },
    select: { id: true },
  });

  req.body.id = user;
  next();
}

module.exports = loginValidator;
