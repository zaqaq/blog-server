let connectInfo;

if(process.env.NODE_ENV === 'development'){
  connectInfo = {
    dbName: 'blog_library',
    userName: 'root',
    userPass: '12345678',
    host: 'localhost',
    dialect: 'mysql'
  }
}else {
  connectInfo = {
    dbName: 'blog_library',
    userName: 'root',
    userPass: 'Xinqi2232!',
    host: '129.211.185.74',
    dialect: 'mysql'
  }
}

module.exports = connectInfo
