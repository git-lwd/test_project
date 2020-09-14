
const sequelize = require('../common/dbConfig')
const { DataTypes } = require("sequelize"); // 导入内置数据类型

const User = sequelize.define('user', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        set(val) {
            return val.replace(/\-/g, '')
        }
    },
    name: DataTypes.STRING(16),
    age: DataTypes.INTEGER(4),
    gender: DataTypes.BOOLEAN,
    birthday: DataTypes.DATE,
    isSuper: {
        type: DataTypes.INTEGER(1),
        defaultValue: 0,
        allowNull: false
    }
}, {
    tableName: 'user'
});

// User.sync({ force: true })

class UserModel {
    create(opts) {
        return User.create(opts)
    }

    findAll(opts,attributes) {
        return User.findAll(opts)
    }

    findById(opts) {
        return User.findById(opts)
    }

    update(opts) {
        return User.update(opts)
    }

    delete(opts) {
        return User.destroy(opts)
    }
}

var uObj = new UserModel();
// uObj.create({
//     name: '萌白酱',
//     age: '22',
//     gender: 1,
//     birthday: '2000-10-10',
// })

(async function () {
    try {
        var data = await uObj.findAll()
        console.log(data)
    } catch (error) {
        console.log('err', error)
    }
})()

