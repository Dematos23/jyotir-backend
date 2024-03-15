const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const superadmin = require("./seeds/admin.seed")
const dni = require("./seeds/dni.seed")
const fs = require("fs")

async function main() {
  await Promise.all([
    superadmin(prisma), 
    dni(prisma)
  ])
}

main()
  .catch((error) => console.log(error))
  .finally(async () => {
    await prisma.$disconnect()
  })
