const BaseService = require('./baseService')
const forumModel = require('../model/forumModel')

class ForumService extends BaseService{
    constructor() {
        super(forumModel)
        this.instance = forumModel
    }

    findForumFilter(params){
        return this.instance.findForumFilterModel(params)
    }
}

module.exports = new ForumService()
