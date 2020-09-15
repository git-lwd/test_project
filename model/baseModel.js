const sequelize = require('../common/dbConfig')

class BaseModel {
    constructor(table, attrs, opts) {
        this.model = sequelize.define(table, attrs, opts);
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
