const db = require('../common/dbConfig')

class BaseModel {
    constructor(table, attrs, opts) {
        this.model = db.defineModel(table, attrs, opts);
        this.model.sync() //模型同步数据库
        // this.model.sync({ force: true }) //强制同步，删除表格重建
    }

    getModel() {
        return this.model
    }

    //创建
    create(attributes) {
        return this.model.create(attributes)
    }

    //主键查询
    findByPk(id) {
        return this.model.findByPk(id)
    }
    
    //条件查询一条
    findOne(where) {
        return this.model.findOne({ where })
    }

    //查询所有数据
    findAll(attributes, where) {
        return attributes ? this.model.findAll({ attributes, where }) : this.model.findAll({ where })
    }

    //分页查询
    findAndCountAll(attributes, where, page = 1, pageSize = 10) {
        let offset = (page - 1) * pageSize;
        return attributes ? this.model.findAndCountAll({ attributes, where, offset, limit: pageSize }) : this.model.findAndCountAll({ where, offset, limit: pageSize })
    }

    //更新
    update(attributes, where) {
        return where ? this.model.update(attributes, { where }) : this.model.update(attributes, { where: {} })
    }

    //删除
    delete(where) {
        return this.model.destroy({ where })
    }
}

module.exports = BaseModel;
