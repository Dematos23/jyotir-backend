const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const superadmin = require("./seeds/admin.seed")

async function main() {
  await Promise.all([superadmin(prisma)]);
}

main()
  .catch((error) => console.log(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
