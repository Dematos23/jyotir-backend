const prisma = require("../utils/prisma");
const jwToken = require("../utils/jwToken");

class UsersService{
    static async findUser(body) {
        return await prisma.users.findUnique({
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