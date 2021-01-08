
const BaseService = require('./baseService')
const commentModel = require('../model/commentModel')

class CommentService extends BaseService{
    constructor() {
        super(commentModel)
        this.instance = commentModel
    }
}

module.exports = new CommentService()