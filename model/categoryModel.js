
const { DataTypes } = require("sequelize"); // 导入内置数据类型
const BaseModel = require('./baseModel')

class CategoryModel extends BaseModel{
    constructor(){
        super('category', {
            pic:DataTypes.STRING(255),
            name:DataTypes.STRING(16),
            parentId:{type:DataTypes.BIGINT(11),allowNull:true}
        })
        this.model = super.getModel()
    }
}


module.exports = new CategoryModel()