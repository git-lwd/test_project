const router = require('koa-router')()
const commentService = require('../service/commentService')
class CommentRoutes {
    static initRoutes() {
        router.prefix('/comment')

        router.get('/open/findAll', async (ctx, next) => {
            try {
                var data = await commentService.BaseFindAll()
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

        router.post('/create', async (ctx, next) => {
            let opts = ctx.request.body;
            try {
                let data = await commentService.BaseCreate(opts)
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
                    ctx.throw(405, 'id不能为空')
                    return;
                }
                var info = await commentService.BaseFindByPk(opts.id)
                if (!info) {
                  ctx.throw(405, '评论不存在')
                  return
                }
                let data = await commentService.BaseUpdate(opts, { id: opts.id })
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
                    ctx.throw(405, 'id不能为空')
                    return
                }
                var info = await commentService.BaseFindByPk(opts.id)
                if (!info) {
                  ctx.throw(405, '评论不存在')
                  return
                }
                let data = await commentService.BaseDelete({ id: opts.id })
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


module.exports = CommentRoutes.initRoutes()
