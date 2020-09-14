const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const router = require('./routes/router')

onerror(app)//添加报错监听器
//post请求处理中间件middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))
// 全局拦截配置CROS，允许跨域访问
app.all('*', async (ctx, next) => {
  res.header('Access-Control-Allow-origin', '*')
  res.header('Access-Control-Allow-Headers', 'accept, origin, X-Requested-With, content-type, token')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Credentials', 'true')
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
})
// 日志logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
router(app)//导入路由
//监听报错
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
