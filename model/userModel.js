
const { DataTypes } = require("sequelize"); // 导入内置数据类型
const BaseModel = require('./baseModel')
const crypto = require('crypto')
class UserModel extends BaseModel {
    constructor() {
        super('user', {
            name: { type: DataTypes.STRING(16), unique: true },
            pic: DataTypes.STRING(255),
            phone: DataTypes.STRING(11),
            password: {
                type: DataTypes.STRING(32),
                set(value) {
                    this.setDataValue('password', crypto.createHash('md5').update(value).digest('hex'));
                }
            },
            age: { type: DataTypes.INTEGER(4), allowNull: true },
            gender: { type: DataTypes.INTEGER(1),defaultValue: 0 },
            birthday: { type: DataTypes.DATEONLY, allowNull: true },
            isSuper: {
                type: DataTypes.INTEGER(1),
                defaultValue: 0
            }
        })
        this.model = super.getModel()
    }

}


module.exports = new UserModel()