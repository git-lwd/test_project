
const { DataTypes } = require("sequelize"); // 导入内置数据类型
const BaseModel = require('./baseModel')
const category = require('./categoryModel')
const user = require('./userModel')

class ForumModel extends BaseModel {
    constructor() {
        super('forum', {
            title: { type: DataTypes.STRING(255), allowNull: false },
            subtitle: DataTypes.STRING(1000),
            pic: DataTypes.STRING(255),
            content: DataTypes.TEXT(),
            author: DataTypes.STRING(32),
            browse: { type: DataTypes.INTEGER(10), defaultValue: 0 },
            praise: { type: DataTypes.INTEGER(10), defaultValue: 0 },
            typeId:DataTypes.STRING(50),
            userId:DataTypes.STRING(50),
            isAudit: {
                type: DataTypes.INTEGER(1),
                defaultValue: 1
            },
            isdel: {
                type: DataTypes.INTEGER(1),
                defaultValue: 0
            }
        }) 
        this.model = super.getModel()
        this.model.belongsTo(category['model'], {as:'category', foreignKey:'typeId'})
        this.model.belongsTo(user['model'], {as:'user', foreignKey:'userId'})
    }
}


module.exports = new ForumModel()