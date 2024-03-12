const hashPass = require("../../utils/hashPass.js")
const { hash } = require("argon2")

async function superadmin(prisma) {
  const password = await hashPass("alessandra")

  await prisma.user.upsert({
    create: {
      email: "dematos23@gmail.com",
      name: "Diego",
      sName: "Enrique",
      lastname: "Matos",
      sLastname: "Castro",
      spiritualName: "Samart",
      dni: 74147399,
      password: password,
      rol: "SUPER_ADMIN",
    },
    where: {
      email: "dematos23@gmail.com",
    },
    update: {
      password: password,
    },
  })
}

module.exports = superadmin
