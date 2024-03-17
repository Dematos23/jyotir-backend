const argon2 = require("argon2");

async function passVerify(hash, pass) {
  try {
    return await argon2.verify(hash, pass);
  } catch (error) {
    console.error("Error al validar contraseña", error);
    throw error;
  }
}

module.exports = passVerify;
