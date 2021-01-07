const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const moment = require('moment')
const config = {
    database: 'swtdata', // 数据库
    username: 'root', // 用户名
    password: 'root', // 口令
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

//统一表格模型字段,id,createdAt,updatedAt
exports.defineModel = function (table, attributes) {
    var attrs = {};
    for (let key in attributes) {
        let val = attributes[key];
        if (typeof val === 'object' && val['type']) {
            val.allowNull = val.allowNull || false;
            attrs[key] = val;
        } else {
            attrs[key] = {
                type: val,
                allowNull: false
            };
        }
    }

    //统一Id
    attrs.id = {
        type: DataTypes.INTEGER(6).ZEROFILL,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    };

    attrs.isdel = {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0
    };

    attrs.createdAt = {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
            return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    };

    attrs.updatedAt = {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
            return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    };

    attrs.version = {
        type: DataTypes.INTEGER(1),
        defaultValue: 0
    }

    return sequelize.define(table, attrs, {
        tableName: table,
        timestamps: false,
        underscored: true,
        paranoid: true,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    obj.createdAt = now;
                    obj.updatedAt = now;
                } else {
                    obj.version = obj.version + 1;
                    obj.updatedAt = now;
                }
            }
        }
    })

}
