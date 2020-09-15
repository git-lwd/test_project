const router = require('koa-router')()
const categoryService = require('../service/categoryService')
class CategoryRoutes {
  static initRoutes() {
    router.prefix('/category')

    router.get('/findAll', async (ctx, next) => {
      try {
        var data = await categoryService.BaseFindAll()
        ctx.body = {
          code: 0,
          data,
          message: '操作成功'
        };
      } catch (error) {
        ctx.body = error
      }
    })

    router.post('/create', async (ctx, next) => {
      let opts = ctx.request.body;
      try {
        let data = await categoryService.BaseCreate(opts)
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
          ctx.throw(405, 'id不能为空')
          return;
        }
        let data = await categoryService.BaseUpdate(opts, { id: opts.id })
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
          ctx.throw(405, 'id不能为空')
          return
        }
        let data = await categoryService.BaseDelete({ id: opts.id })
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


module.exports = CategoryRoutes.initRoutes()
