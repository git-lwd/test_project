const router = require('koa-router')()
const userService = require('../service/userService')
class UserRoutes {
  static initRoutes() {
    router.prefix('/users')

    router.get('/findAll', async (ctx, next) => {
      try {
        var data = await userService.BaseFindAndCountAll()
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
        var data = await userService.BaseFindByPk(ctx.query.id)
        if (data) {
          ctx.body = {
            code: 0,
            data,
            message: '操作成功'
          };
        } else {
          ctx.throw(405, '用户不存在');
        }
      } catch (error) {
        ctx.throw(500, error);
      }
    })

    router.post('/create', async (ctx, next) => {
      let opts = ctx.request.body;
      try {
        let data = await userService.BaseCreate(opts)
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
          ctx.throw(405, '用户id不能为空')
          return;
        }
        let data = await userService.BaseUpdate(opts, { id: opts.id })
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
          ctx.throw(405, '用户id不能为空')
          return
        }
        let data = await userService.BaseDelete({ id: opts.id })
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


module.exports = UserRoutes.initRoutes()
