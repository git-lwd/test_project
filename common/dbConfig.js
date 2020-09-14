const Sequelize = require('sequelize');
const config = {
    database: 'mydata', // 数据库
    username: 'root', // 用户名
    password: '123456', // 口令
    host: 'localhost', // 主机名
    port: 3306 // 端口号，MySQL默认3306
};
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    //配置连接池
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
//测试链接
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;