const UserModel = require('../models/user')
const { Op } = require("sequelize")

const Users = UserModel();

const addUser = async(userInfo) => {
    await Users.create(userInfo)
}

const findUser = async() => {
    const allUsers = await Users.findAll({
        where: {
            id: {
                [Op.gt]: 75
            }
        },
        //attributes: ['firstName']
    });
    const a = allUsers.map(users => users.dataValues)
    return a;
}

const updateUser = async() => {
    await Users.update({ lastName: "Doe" },{
        where: {
            id: 80
        }
    });
    // const a = allUsers.map(users => users.dataValues)
    // return a;
}

module.exports = {
    addUser,
    findUser,
    updateUser
}
