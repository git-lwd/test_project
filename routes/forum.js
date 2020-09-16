const router = require('koa-router')()
const forumService = require('../service/forumService')
class ForumRoutes {
    static initRoutes() {
        router.prefix('/forum')

        router.get('/open/findAll', async (ctx, next) => {
            let query = ctx.query;
            try {
                var data = await forumService.BaseFindAndCountAll()
                ctx.body = {
                    code: 0,
                    data,
                    message: '操作成功'
                };
            } catch (error) {
                ctx.throw(500, error);
                next()
            }
        })

        router.get('/open/findById', async (ctx, next) => {
            try {
                var data = await forumService.BaseFindByPk(ctx.query.id)
                if (data) {
                    ctx.body = {
                        code: 0,
                        data,
                        message: '操作成功'
                    };
                } else {
                    ctx.throw(405, '帖子不存在');
                }
            } catch (error) {
                ctx.throw(500, error);
                next()
            }
        })

        router.post('/create', async (ctx, next) => {
            let opts = ctx.request.body;
            try {
                let data = await forumService.BaseCreate(opts)
                ctx.body = {
                    code: 0,
                    data: data,
                    message: '操作成功'
                }
            } catch (error) {
                ctx.throw(500, error);
                next()
            }
        })

        router.post('/update', async (ctx, next) => {
            let opts = ctx.request.body;
            try {
                if (!opts.id) {
                    ctx.throw(405, '帖子id不能为空')
                    return;
                }
                var info = await forumService.BaseFindByPk(opts.id)
                if (!info) {
                  ctx.throw(405, '帖子不存在')
                  return
                }
                let data = await forumService.BaseUpdate(opts, { id: opts.id })
                if (data[0]) {
                    ctx.body = {
                        code: 0,
                        data: data,
                        message: '操作成功'
                    }
                } else {
                    ctx.body = {
                        code: 1,
                        message: '参数有误'
                    }
                }
            } catch (error) {
                ctx.throw(500, error);
                next()
            }
        })

        router.delete('/delete', async (ctx, next) => {
            let opts = ctx.query;
            try {
                if (!opts.id) {
                    ctx.throw(405, '帖子id不能为空')
                    return
                }
                var info = await forumService.BaseFindByPk(opts.id)
                if (!info) {
                  ctx.throw(405, '帖子不存在')
                  return
                }
                let data = await forumService.BaseDelete({ id: opts.id })
                if (data) {
                    ctx.body = {
                        code: 0,
                        data: data,
                        message: '操作成功'
                    }
                } else {
                    ctx.body = {
                        code: 1,
                        message: '参数有误'
                    }
                }
            } catch (error) {
                ctx.throw(500, error);
                next()
            }
        })

        return router

    }
}


module.exports = ForumRoutes.initRoutes()
