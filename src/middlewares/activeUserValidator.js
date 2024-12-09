const findUser = require("../utils/findUser");

async function activeUserValidator(req, res, next) {
  const targetUser = await findUser(req.body);

  if (targetUser.state !== "ACTIVO") {
    return res
      .status(400)
      .json({ message: "El usuario se encuentra inactivo" });
  }

  if (targetUser.state === "ACTIVO") {
    next();
  }
}

module.exports = activeUserValidator;
