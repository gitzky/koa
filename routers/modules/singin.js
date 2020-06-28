const router = require('koa-router')()
const md5 = require('md5')
const db = require('../../lib/db')
const setToken = require('../../middlewares/check').setToken

// 登录
router.post('/', async (ctx, next) => {
  console.log(ctx)
  let name = ctx.request.body.name
  let pass = ctx.request.body.pass
  pass = md5(pass)
  await db('users')
    .where(`name = '${name}' AND pass='${pass}'`)
    .select()
    .then((data) => {
      console.log('data', data)
      var json = { code: '0', data: null, msg: 'success' }
      if (data && !!data.length) {
        // 存入将token信息
        setToken(data[0].name, data[0].id)
          .then((token) => {
            console.log('token:', token)
            json.data = {
              name: data[0].name,
              id: data[0].id,
              tel: data[0].tel,
              avator: data[0].avator,
              token: token,
              message: '登录成功',
            }

            ctx.body = JSON.stringify(json)
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        ctx.body = JSON.stringify(json)
      }
    })
})

module.exports = router.routes()
