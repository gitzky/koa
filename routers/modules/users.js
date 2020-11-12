const router = require('koa-router')()
const db = require('../../lib/db')

// 用户
router.post('/selUserList', async (ctx, next) => {
  let page = ctx.request.body.page ? ctx.request.body.page : 1
  let _sql = ` select id,name,moment,avator FROM users limit ${
    (page - 1) * 10
  },10;`
  await db('users')
    .query(_sql)
    .then((data) => {
      console.log('ctx.state', ctx.state)

      var json = { code: '0', data: { list: data }, msg: 'success' }
      ctx.body = JSON.stringify(json)
    })
})

router.post('/getMemberByToken', async (ctx, next) => {
  console.log('获取ctx.state：', ctx.state)
  if (ctx.state && ctx.state.data) {
    let id = ctx.state.data._id
    let name = ctx.state.data._name
    let _sql = ` select id,name,moment,avator FROM users where id=${id} and name = '${name}';`
    await db('users')
      .query(_sql)
      .then((data) => {
        console.log('获取数据data:', data)
        var json = { code: '0', data: data[0], msg: 'success' }
        ctx.body = JSON.stringify(json)
      })
  } else {
    var json = { code: '0', data: null, msg: 'success' }
    ctx.body = JSON.stringify(json)
  }
})

module.exports = router.routes()

