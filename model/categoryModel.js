
const { DataTypes } = require("sequelize"); // 导入内置数据类型
const BaseModel = require('./baseModel')

class CategoryModel extends BaseModel{
    constructor(){
        super('category', {
            pic:DataTypes.STRING(255),
            name: {
                type:DataTypes.STRING(16),
                allowNull:false,
            },
            parentId:DataTypes.BIGINT(11),
            isdel: {
                type: DataTypes.INTEGER(1),
                defaultValue: 0,
                allowNull: false
            }
        }, {
            tableName: 'category'
        })
        this.model = super.getModel()
        this.model.sync() //模型同步数据库
        // this.model.sync({ force: true }) //强制同步，删除表格重建
    }
}


module.exports = new CategoryModel()