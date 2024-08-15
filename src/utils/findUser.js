const prisma = require('../utils/prisma');

async function finUser(body) {
    const user = await prisma.users.findUnique({
        where: {
            email: body.email
        },
        select: {
            id: true,
            name: true,
            lastname: true,
            phone: true,
            address: true,
            password: true,
        }
    })
}