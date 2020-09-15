const router = require('koa-router')()
const forumService = require('../service/forumService')
class ForumRoutes {
  static initRoutes() {
    router.prefix('/users')

    router.get('/findAll', async (ctx, next) => {
      try {
        var data = await forumService.BaseFindAndCountAll()
        ctx.body = {
          code: 0,
          data,
          message: '操作成功'
        };
      } catch (error) {
        ctx.body = error
      }
    })

    router.get('/findById', async (ctx, next) => {
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
      }
    })

    router.post('/update', async (ctx, next) => {
      let opts = ctx.request.body;
      try {
        if (!opts.id) {
          ctx.throw(405, '帖子id不能为空')
          return;
        }
        let data = await forumService.BaseUpdate(opts, { id: opts.id })
        if(data[0]){
          ctx.body = {
            code: 0,
            data: data,
            message: '操作成功'
          }
        }else{
          ctx.body = {
            code: 1,
            message: '参数有误'
          }
        }
      } catch (error) {
        ctx.throw(500, error);
      }
    })

    router.delete('/delete', async (ctx, next) => {
      let opts = ctx.request.body;
      try {
        if (!opts.id) {
          ctx.throw(405, '帖子id不能为空')
          return
        }
        let data = await forumService.BaseDelete({ id: opts.id })
        if(data){
          ctx.body = {
            code: 0,
            data: data,
            message: '操作成功'
          }
        }else{
          ctx.body = {
            code: 1,
            message: '参数有误'
          }
        }
      } catch (error) {
        ctx.throw(500, error);
      }
    })

    return router

  }
}


module.exports = ForumRoutes.initRoutes()
