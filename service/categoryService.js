const BaseService = require('./baseService')
const categoryModel = require('../model/categoryModel')

class categoryService extends BaseService{
    constructor() {
        super(categoryModel)
        this.instance = categoryModel
    }
}

module.exports = new categoryService()
