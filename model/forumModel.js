
const { DataTypes } = require("sequelize"); // 导入内置数据类型
const BaseModel = require('./baseModel')
const categoryModel = require('./categoryModel')
const userModel = require('./userModel')

class ForumModel extends BaseModel {
    constructor() {
        super('forum', {
            title: { type: DataTypes.STRING(255), allowNull: false },
            subtitle: DataTypes.STRING(1000),
            pic: DataTypes.STRING(255),
            content: DataTypes.TEXT(),
            author: DataTypes.STRING(32),
            typeId: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                references: {
                    // 引用的另外一个模型
                    model: categoryModel,
                    // 引用另外一个模型的属性
                    key: 'id',
                }
            },
            userId: {
                type: DataTypes.UUID(),
                allowNull: false,
                references: {
                    // 引用的另外一个模型
                    model: userModel,
                    // 引用另外一个模型的属性
                    key: 'id',
                }
            },
            browse: DataTypes.INTEGER(10),
            praise: DataTypes.INTEGER(10),
            isAudit: {
                type: DataTypes.INTEGER(1),
                defaultValue: 1,
                allowNull: false
            },
            isdel: {
                type: DataTypes.INTEGER(1),
                defaultValue: 0,
                allowNull: false
            }
        }, {
            tableName: 'forum'
        })
        this.model = super.getModel()
        // this.model.sync() //模型同步数据库
        this.model.sync({ force: true }) //强制同步，删除表格重建
    }
}


module.exports = new ForumModel()