const Router = require('koa-router')
const register = require('./modules/register')
const singin = require('./modules/singin')
const login = require('./modules/login')
const logout = require('./modules/logout')
const posts = require('./modules/posts')
const users = require('./modules/users')

let router = new Router()
// 路由
router.use('/api/register', register)
router.use('/api/singin', singin)
// router.use('/api/login', login)
router.use('/api/logout', logout)
router.use('/api/posts', posts)
router.use('/api/users', users)

module.exports = router
