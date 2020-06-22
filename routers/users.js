const router = require('koa-router')()
const db = require('../lib/db')

// 用户
router.post('/api/selUserList', async (ctx, next) => {
  console.log(ctx.request.body)
  let page = ctx.request.body.page ? ctx.request.body.page : 1
  let _sql = ` select id,name,moment,avator FROM users limit ${
    (page - 1) * 10
  },10;`
  await db('users')
    .query(_sql)
    .then((data) => {
      console.log('data', data)
      var json = { code: '0', data: { list: data }, msg: 'success' }
      ctx.body = JSON.stringify(json)
    })
})

module.exports = router
