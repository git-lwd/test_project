const router = require('koa-router')()
const userService = require('../service/userService')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
class UserRoutes {
  static initRoutes() {
    router.prefix('/users')

    router.post('/register', async (ctx, next) => {
      let opts = ctx.request.body;
      try {
        let user = await userService.BaseFindOne({ name: opts.name })
        if (user) {
          ctx.body = {
            code: 1,
            message: '用户已存在'
          }
          return
        }
        let data = await userService.BaseCreate(opts)
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

    router.post('/login', async (ctx, next) => {
      let opts = ctx.request.body;
      if (!opts.name || !opts.password) {
        ctx.body = {
          code: 1,
          message: '用户名或密码不能为空'
        }
        return
      }
      try {
        let pwd = crypto.createHash('md5').update(opts.password).digest('hex')
        let user = await userService.BaseFindOne({ name: opts.name, password: pwd })
        if (!user) {
          ctx.body = {
            code: 1,
            message: '用户名或密码错误'
          }
          return
        }
        let userToken = {
          id: user.id,
          name: user.name
        };
        console.log('user', userToken)
        const token = jwt.sign(userToken, ctx.state.secret, { expiresIn: '1h' })  //token签名 有效期为1小时
        ctx.body = {
          code: 0,
          data: { token, user },
          message: '登录成功'
        }

      } catch (error) {
        ctx.throw(500, error);
        next()
      }
    })

    router.get('/open/findAll', async (ctx, next) => {
      try {
        var data = await userService.BaseFindAndCountAll()
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
      // let token = ctx.header.authorization
      // let payload = jwt.verify(token.split(' ')[1],ctx.state.secret)
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
        next()
      }
    })

    router.post('/update', async (ctx, next) => {
      let opts = ctx.request.body;
      try {
        if (!opts.id) {
          ctx.throw(405, '用户id不能为空')
          return;
        }
        var info = await userService.BaseFindByPk(opts.id)
        if (!info) {
          ctx.body = {
            code: 1,
            message: '用户不存在'
          }
          return
        }
        let data = await userService.BaseUpdate(opts, { id: opts.id })
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
          ctx.throw(405, '用户id不能为空')
          return
        }
        var info = await userService.BaseFindByPk(opts.id)
        if (!info) {
          ctx.throw(405, '用户不存在')
          return
        }
        let data = await userService.BaseDelete({ id: opts.id })
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


module.exports = UserRoutes.initRoutes()
