const argon2 = require("argon2");

async function hashPass(pass) {
  try {
    const hash = await argon2.hash(pass);
    console.log(pass);
    console.log(hash);
    return hash;
  } catch (error) {
    console.error("Error al hashear la contraseña:", error);
    throw error;
  }
}

module.exports = hashPass;