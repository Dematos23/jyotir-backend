const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const devUser = require("./seeds/devUser.seed.js")
const users = require("./seeds/users.seed.js")
// const dni = require("./seeds/dni.seed")

async function main() {
  await Promise.all([
    devUser(prisma), 
    users(prisma),
    // dni(prisma)
  ])
}

main()
  .catch((error) => console.log(error))
  .finally(async () => {
    await prisma.$disconnect()
  })
