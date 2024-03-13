const fs = require("fs")
const path = require("path")

async function dni(prisma) {
    const dniFilePath = path.join(__dirname, 'data', 'dni.json');
    console.log(dniFilePath);
  const data = JSON.parse(fs.readFileSync(dniFilePath, "utf8"))

  await Promise.all(
    data.map(async (item) => {
      await prisma.dni.create({
        data: {
          dni: item.dni,
          rol: item.rol,
        },
      })
    })
  )

  console.log("DNIs agregados correctamente")
}

module.exports = dni
