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


// exports.defineModel = function (name, attributes) {
//     var attrs = {};

//     //统一Id
//     attrs.id = {
//         type: Sequelize.STRING(50),
//         primaryKey: true,
//         allowNull: false,
//         unique: true,
//     };

//     for (let key in attributes) {
//         let val = attributes[key];
//         if (typeof val === 'object' && val['type']) {
//             val.allowNull = val.allowNull || false;
//             attrs[key] = val;
//         } else {
//             attrs[key] = {
//                 type: val,
//                 allowNull: false
//             };
//         }
//     }
//     attrs.createdAt = {
//         type: Sequelize.BIGINT,
//         allowNull: false
//     };

//     attrs.updatedAt = {
//         type: Sequelize.BIGINT,
//         allowNull: false
//     };

//     attrs.version = {
//         type: Sequelize.BIGINT
//     }

//     return sequelize.define(name, attrs, {
//         tableName: name,
//         timestamps: true,
//         underscored: true,
//         paranoid: true,
//         hooks: {
//             beforeValidate: function (obj) {
//                 let now = Date.now();
//                 if (obj.isNewRecord) {
//                     obj.id = uuId.v4().replace(/-/g, '');
//                     obj.version = 0;
//                     obj.createdAt = now;
//                     obj.updatedAt = now;
//                 } else {
//                     obj.version = obj.version + 1;
//                     obj.updatedAt = Date.now();
//                 }
//             }
//         }
//     })

// }
