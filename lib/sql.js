const moment = require('moment')
/****************** 用户 ************************************/
// 注册用户
let insertData = function (value) {
  let createTime = new Date()
  createTime = moment(createTime).format('YYYY-MM-DD HH:mm:ss')
  console.log('createTime', createTime)
  let _sql =
    "insert into users set name=?,pass=?,avator=?,moment='" + createTime + "';"
  return { _sql, value }
}

// 删除用户
let deleteUserData = function (name) {
  let _sql = `delete from users where name="${name}";`
  return { _sql }
}

// 查找用户
let findUserData = function (name) {
  let _sql = `select * from users where name="${name}";`
  return { _sql }
}

// 查询所有文章
let findUserByPage = function (page) {
  page = page ? page : 1
  let _sql = ` select id,name,moment,avator FROM users limit ${
    (page - 1) * 10
  },10;`
  return { _sql }
}

/*****************  文章  *************************************/

// 发表文章
let insertPost = function (value) {
  let _sql = `insert into users set name=?,title=?,content=?,md=?,uid=?,moment=?,avator=?;`
  return { _sql, value }
}

// 查询所有文章
let findAllPost = function () {
  let _sql = ` select * FROM posts;`
  return { _sql }
}

// 查询分页文章
let findPostByPage = function (page) {
  page = page ? page : 1
  let _sql = ` select * FROM posts limit ${(page - 1) * 10},10;`
  return { _sql }
}

// 查询个人分页文章
let findPostByUserPage = function (name, page) {
  page = page ? page : 1
  let _sql = ` select * FROM posts where name="${name}" order by id desc limit ${
    (page - 1) * 10
  },10 ;`
  return { _sql }
}

// 通过文章id查找
let findPostById = function (id) {
  let _sql = `select * from posts where id="${id}";`
  return { _sql }
}

// 更新修改文章
let updatePost = function (values) {
  let _sql = `update posts set  title=?,content=?,md=? where id=?`
  return query(_sql, values)
}

// 删除文章
let deletePost = function (id) {
  let _sql = `delete from posts where id = ${id}`
  return { _sql }
}

/*******************  评论  ***********************************/

// 发表评论
let insertComment = function (value) {
  let _sql =
    'insert into comment set name=?,content=?,moment=?,postid=?,avator=?;'
  return { _sql, value }
}

// 删除评论
let deleteComment = function (id) {
  let _sql = `delete from comment where id=${id}`
  return { _sql }
}

// 评论分页
let findCommentByPage = function (page, postId) {
  page = page ? page : 1
  let _sql = `select * from comment where postid=${postId} order by id desc limit ${
    (page - 1) * 10
  },10;`
  return { _sql }
}

// 更新文章评论数
let updatePostComment = function (value) {
  let _sql = 'update posts set comments=? where id=?'
  return { _sql, value }
}

// 更新浏览数
let updatePostPv = function (value) {
  let _sql = 'update posts set pv=? where id=?'
  return { _sql, value }
}

module.exports = {
  insertData,
  deleteUserData,
  findUserData,
  findUserByPage,

  insertPost,
  findAllPost,
  findPostByPage,
  findPostByUserPage,
  findPostById,
  updatePost,
  deletePost,

  insertComment,
  deleteComment,
  findCommentByPage,
  updatePostComment,
  updatePostPv,
}
