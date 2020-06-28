const Koa = require('koa')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const path = require('path')
const render = require('koa-art-template')
const Moment = require('moment')
const router = require('./routers/index')
const verifyToken = require('./middlewares/check').verifyToken

const app = new Koa()

// 使用日志中间件
const logger = koaLogger((str) => {
  console.log(Moment().format('YYYY-MM-DD HH:mm:ss') + str)
})
// 使用中间件
app.use(logger)

// 配置模板文件
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.art',
  debug: true,
})
// 配置静态资源加载中间件
app.use(static(path.join(__dirname, '/public')))
// 配置请求参数
app.use(
  bodyParser({
    formLimit: '1mb',
  }),
)

app.use(async (ctx, next) => {
  var token = ctx.headers.authorization
  if (token == undefined || token == null || token == '') {
    await next()
  } else {
    var res = await verifyToken(token)
    console.log('token', token, 'res', res)
    //这一步是为了把解析出来的用户信息存入全局state中，这样在其他任一中间价都可以获取到state中的值
    ctx.state = {
      data: res,
    }
    await next()
  }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(8888)
console.log('server runing at 127.0.0.1:8888')
