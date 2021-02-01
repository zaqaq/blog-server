const { DataTypes } = require('sequelize')
const db = require('../config/db')

module.exports = db.define("header_navs", {
    parent_id: {
        type: DataTypes.INTEGER
    },
    nav_id: {
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING
    }
});
    
    // User.sync({
    //     force: true
    // })
    // .then(async () => {
    //     await UserModel.create({
    //         firstName: "Sue1",
    //         lastName: "Smith"
    //     });
    // });
