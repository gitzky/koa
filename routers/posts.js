const router = require('koa-router')()
const db = require('../lib/db')

// 文章

router.post('/api/selPostList', async (ctx, next) => {
  console.log(ctx.request.body)
  // ctx.body = '{"data":123}'
  await db('posts')
    .select()
    .then((data) => {
      console.log('data', data)
      var json = { code: '0', data: { list: data }, msg: 'success' }
      ctx.body = JSON.stringify(json)
    })
})

module.exports = router
