const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const router = require('./routes/router')
const koajwt = require('koa-jwt')
const jwt = require('jsonwebtoken')
const SECRET = 'lwd';

onerror(app)//添加报错监听器

//post请求处理
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
//静态资源
app.use(require('koa-static')(__dirname + '/public'))
//页面引擎
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// 全局拦截配置CROS，允许跨域访问
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , token');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});

app.use(async (ctx, next) => {
  ctx.state.secret = SECRET
  let token = ctx.header.authorization
  if (token == undefined) {
    await next();
  } else {
    //token存在，解析信息
    try {
      let user = jwt.verify(token.split(' ')[1], SECRET)
      ctx.state.user = user;
    await next();
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        code: '0001',
        message: '用户未登录'
      };
      
    }
  }
})

// 日志logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next().catch((err) => {
    console.log('err', err.status)
    if (401 == err.status) {
      ctx.status = 500
      ctx.body = {
        code: '0001',
        message: '用户未登录'
      };
    } else {
      throw err;
    }
  });
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})



//初始化未登录拦截,排除/open接口，其他进行登录验证
app.use(koajwt({ SECRET }).unless({
  path: [/(\/open)|(\/login)|(\/register)/]
}))

router(app)//导入路由

//监听报错
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
