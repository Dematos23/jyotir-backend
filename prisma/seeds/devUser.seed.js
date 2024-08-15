const passHash = require("../../src/utils/passHash.js");

async function devUser(prisma) {
  const password = await passHash("alessandra");

  await prisma.users.create({
    data: {
      email: "dematos23@gmail.com",
      name: "Diego",
      sName: "Enrique",
      lastname: "Matos",
      sLastname: "Castro",
      spiritualName: "Samart",
      // dni: 74147399,
      password: password,
      rol: "DEV",
    },
  });
}

module.exports = devUser;

