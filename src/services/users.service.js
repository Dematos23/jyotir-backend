const prisma = require("../utils/prisma");

class UsersService{
    static async get(){
        return await prisma.users.findMany({
            where: {
                OR: [
                    {rol: 'ADMIN'},
                    {rol: 'EXTERNO'}
                ]
            },
            select: {
                email: true,
                name: true,
                lastname: true,
                spiritualName: true,
                rol: true,
            },
        });
        // return users;
    }
}

module.exports = UsersService;