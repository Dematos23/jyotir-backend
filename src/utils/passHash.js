const argon2 = require("argon2");

async function passHash(pass) {
  try {
    const hash = await argon2.hash(pass);
    return hash;
  } catch (error) {
    console.error("Error al hashear la contraseña:", error);
    throw error;
  }
}

module.exports = passHash;