
const { DataTypes, Op } = require("sequelize"); // 导入内置数据类型
const BaseModel = require('./baseModel')
const category = require('./categoryModel')
const user = require('./userModel')

class ForumModel extends BaseModel {
    constructor() {
        super('forum', {
            title: DataTypes.STRING(255),
            subtitle: DataTypes.TEXT(),
            pic: DataTypes.STRING(255),
            content: DataTypes.TEXT(),
            author: DataTypes.STRING(32),
            browse: { type: DataTypes.INTEGER(10), defaultValue: 0 },
            praise: { type: DataTypes.INTEGER(10), defaultValue: 0 },
            typeId: {
                type: DataTypes.INTEGER(6).ZEROFILL,
                references: {
                    model: category['model'],
                    key: 'id'
                }
            },
            userId: {
                type: DataTypes.INTEGER(6).ZEROFILL,
                references: {
                    model: user['model'],
                    key: 'id'
                }
            },
            isAudit: {
                type: DataTypes.INTEGER(1),
                defaultValue: 1
            }
        })
        this.model = super.getModel()
    }

    findForumFilterModel(params) {
        let where = {};
        //字段参数筛选
        let filters = ['userId', 'typeId'] 
        for (var i in params) {
            if (filters.includes(i)) {
                where[i] = {
                    [Op.eq]: params[i]
                }
            }
        }
        //时间范围筛选
        if (params.startTime && params.endTime) {
            where.createdAt = {
                [Op.gte]: new Date(params.startTime),
                [Op.lte]: new Date(params.endTime),
            }
        }
        return this.findAndCountAll(null, where, params.page, params.pageSize)
    }

    
}


module.exports = new ForumModel()