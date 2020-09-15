
const { DataTypes } = require("sequelize"); // 导入内置数据类型
const BaseModel = require('./baseModel')

class UserModel extends BaseModel{
    constructor(){
        super('user', {
            id: {
                primaryKey: true,
                allowNull: false,
                unique: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV1,
            },
            pic:DataTypes.STRING(255),
            phone:DataTypes.STRING(11),
            password:DataTypes.STRING(32),
            name: DataTypes.STRING(16),
            age: DataTypes.INTEGER(4),
            gender: DataTypes.INTEGER(1),
            birthday: DataTypes.DATEONLY,
            isSuper: {
                type: DataTypes.INTEGER(1),
                defaultValue: 0,
                allowNull: false
            },
            isdel: {
                type: DataTypes.INTEGER(1),
                defaultValue: 0,
                allowNull: false
            }
        }, {
            tableName: 'user'
        })
        this.model = super.getModel()
        this.model.sync() //模型同步数据库
        // this.model.sync({ force: true }) //强制同步，删除表格重建
    }
}


module.exports = new UserModel()