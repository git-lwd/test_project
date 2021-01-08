
const { DataTypes } = require("sequelize"); // 导入内置数据类型
const BaseModel = require('./baseModel')
const forum = require('./forumModel')
const user = require('./userModel')
class CommentModel extends BaseModel {
    constructor() {
        super('comment', {
            content: DataTypes.TEXT(),
            images: { type: DataTypes.TEXT(), allowNull: true },
            praise: { type: DataTypes.INTEGER(10), defaultValue: 0 },
            forumId: {
                type: DataTypes.INTEGER(6).ZEROFILL,
                references: {
                    model: forum['model'],
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
            userName: { type: DataTypes.STRING(20), allowNull: true },
            userPic: { type: DataTypes.STRING(255), allowNull: true },
            replyId: { type: DataTypes.INTEGER(6).ZEROFILL, allowNull: true }
        })
        this.model = super.getModel()
    }

   async findAllComment(params){
        let where = {};
        
        return await this.findAndCountAll(null, where, params.page, params.pageSize)
    }

}


module.exports = new CommentModel()