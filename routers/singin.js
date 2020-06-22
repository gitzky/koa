const router = require('koa-router')()
const md5 = require('md5')
const db = require('../lib/db')

// 登录
router.post('/api/login', async (ctx, next) => {
  console.log(ctx)
  // let name = ctx.request.body.name;
  // let pass = ctx.request.body.pass;
  db('users')
    .select()
    .then((data) => {
      console.log('data', data)
      var json = { code: '0', data: { list: data }, msg: 'success' }
      ctx.body = JSON.stringify(json)
    })
})

module.exports = router
