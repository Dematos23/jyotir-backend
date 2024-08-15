const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");
const key = process.env.JWT_SECRET


async function loginValidator(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];

  function tokenDecoder(token) {
    try {
  
      // const tokenString = JSON.stringify(token)
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

  const user = await prisma.users.findUnique({
    where: { id: result.id },
    select: { id: true },
  });
  req.body.userId = user.id;
  next();
}

module.exports = loginValidator;
