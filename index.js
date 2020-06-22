const Koa = require('koa')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const path = require('path')
const render = require('koa-art-template')

const app = new Koa()

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

const register = require('./routers/register')
const singin = require('./routers/singin')
const login = require('./routers/login')
const logout = require('./routers/logout')
const posts = require('./routers/posts')
const users = require('./routers/users')

// 路由
app.use(register.routes())
app.use(singin.routes())
// app.use(login.routes())
app.use(logout.routes())
app.use(posts.routes())
app.use(users.routes())

app.listen(8888)
console.log('server runing at 127.0.0.1:8888')
