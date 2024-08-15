const prisma = require("../utils/prisma");

class UsersService{
    static async get(){
        return await prisma.user.findMany({
            
        });
    }
}

module.exports = UsersService;