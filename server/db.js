const Sequelize = require('sequelize');

const sequelize = new Sequelize('blog_library', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
    
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define:{
        timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
    },
    
    // SQLite only
    storage: 'path/to/database.sqlite'
});

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

module.exports =  sequelize;
