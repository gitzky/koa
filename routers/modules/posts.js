const router = require('koa-router')()
const db = require('../../lib/db')

// 文章

router.post('/selPostList', async (ctx, next) => {
  console.log('ctx.state', ctx.state)
  // ctx.body = '{"data":123}'
  await db('posts')
    .select()
    .then((data) => {
      var json = { code: '0', data: { list: data }, msg: 'success' }
      ctx.body = JSON.stringify(json)
    })
})

router.post('/selPostById', async (ctx, next) => {
  var id = ctx.request.body.id || null
  console.log('id--------', id)
  await db('posts')
    .where({id})
    .find()
    .then((data) => {
      var json = { code: '0', data, msg: 'success' }
      ctx.body = JSON.stringify(json)
    })
})

router.post('/addPost', async (ctx, next) => {
  console.log('ctx.state--------',     ctx.state,)
  var datas = {
    uid: ctx.state.data._id,
    name: ctx.request.body.name,
    title: ctx.request.body.title,
    content: ctx.request.body.content,
    md: ctx.request.body.md,
    moment: ctx.request.body.moment,
    coomments: ctx.request.body.coomments,
    pv: ctx.request.body.pv,
    avator: ctx.request.body.avator
  }
  
  console.log('uid--------', datas)
  
  await db('posts')
    .add(datas)
    .then((data) => {
      var json = { code: '0', data, msg: 'success' }
      ctx.body = JSON.stringify(json)
    })
})


module.exports = router.routes()
