const Sequelize = require('sequelize')
const db = require('../db')

module.exports = function (){
    const User = db.define("users", {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        }
    });
    // User.sync({
    //     force: true
    // }).then(async () => {
    //     await UserModel.create({
    //         firstName: "Sue1",
    //         lastName: "Smith"
    //     });
    // });
    
    return User;
};
