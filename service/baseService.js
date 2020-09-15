class BaseService {
    constructor(instance) {
        this.instance = instance
    }

    BaseCreate(attributes) {
        return this.instance.create(attributes)
    }

    BaseFindByPk(id) {
        return this.instance.findByPk(id)
    }

    BaseFindAll(attributes, where) {
        return this.instance.findAll(attributes, where)
    }

    BaseFindAndCountAll(attributes, where, page, pageSize) {
        return this.instance.findAndCountAll(attributes, where, page, pageSize)
    }

    BaseUpdate(attributes, where) {
        return this.instance.update(attributes, where)
    }

    BaseDelete(where) {
        return this.instance.delete(where)
    }
}

module.exports = BaseService