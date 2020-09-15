const BaseService = require('./baseService')
const forumModel = require('../model/forumModel')

class ForumService extends BaseService{
    constructor() {
        super(forumModel)
        this.instance = forumModel
    }
}

module.exports = new ForumService()
