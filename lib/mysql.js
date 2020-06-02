var mysql = require("mysql");
var config = require("../config");

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
});

let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};

let users = `create table if not exists users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    avator VARCHAR(100) NOT NULL,
    moment VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
  );`;

let posts = `create table if not exists posts(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    title TEXT(0) NOT NULL,
    content TEXT(0) NOT NULL,
    md TEXT(0) NOT NULL,
    uid VARCHAR(40) NOT NULL,
    moment VARCHAR(100) NOT NULL,
    comments VARCHAR(200) NOT NULL DEFAULT '0',
    pv VARCHAR(40) NOT NULL DEFAULT '0',
    avator VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
  );`;

let comments = `create table if not exists comments(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    content TEXT(0) NOT NULL,
    moment VARCHAR(40) NOT NULL,
    postid VARCHAR(40) NOT NULL,
    avator VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
  );`;

let createTable = function (sql) {
  return query(sql, []);
};

// 建表
createTable(users);
createTable(posts);
createTable(comments);

/****************** 用户 ************************************/
// 注册用户
let insertData = function (value) {
  let _sql = "insert into users set name=?,pass=?,avator=?,moment=?;";
  return query(_sql, value);
};

// 删除用户
let deleteUserData = function (name) {
  let _sql = `delete from users where name="${name}";`;
  return query(_sql);
};

// 查找用户
let findUserData = function (name) {
  let _sql = `select * from users where name="${name}";`;
  return query(_sql);
};

// 查询所有文章
let findUserByPage = function (page) {
  page = page ? page : 1;
  let _sql = ` select * FROM users limit ${(page - 1) * 10},10;`;
  return query(_sql);
};

/*****************  文章  *************************************/

// 发表文章
let insertPost = function (value) {
  let _sql = `insert into users set name=?,title=?,content=?,md=?,uid=?,moment=?,avator=?;`;
  return query(_sql, value);
};

// 查询所有文章
let findAllPost = function () {
  let _sql = ` select * FROM posts;`;
  return query(_sql);
};

// 查询分页文章
let findPostByPage = function (page) {
  page = page ? page : 1;
  let _sql = ` select * FROM posts limit ${(page - 1) * 10},10;`;
  return query(_sql);
};

// 查询个人分页文章
let findPostByUserPage = function (name, page) {
  page = page ? page : 1;
  let _sql = ` select * FROM posts where name="${name}" order by id desc limit ${
    (page - 1) * 10
  },10 ;`;
  return query(_sql);
};

// 通过文章id查找
let findPostById = function (id) {
  let _sql = `select * from posts where id="${id}";`;
  return query(_sql);
};

// 更新修改文章
let updatePost = function (values) {
  let _sql = `update posts set  title=?,content=?,md=? where id=?`;
  return query(_sql, values);
};

// 删除文章
let deletePost = function (id) {
  let _sql = `delete from posts where id = ${id}`;
  return query(_sql);
};

/*******************  评论  ***********************************/

// 发表评论
let insertComment = function (value) {
  let _sql =
    "insert into comment set name=?,content=?,moment=?,postid=?,avator=?;";
  return query(_sql, value);
};

// 删除评论
let deleteComment = function (id) {
  let _sql = `delete from comment where id=${id}`;
  return query(_sql);
};

// 评论分页
let findCommentByPage = function (page, postId) {
  page = page ? page : 1;
  let _sql = `select * from comment where postid=${postId} order by id desc limit ${
    (page - 1) * 10
  },10;`;
  return query(_sql);
};

// 更新文章评论数
let updatePostComment = function (value) {
  let _sql = "update posts set comments=? where id=?";
  return query(_sql, value);
};

// 更新浏览数
let updatePostPv = function (value) {
  let _sql = "update posts set pv=? where id=?";
  return query(_sql, value);
};

module.exports = {
  query,
  createTable,
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
};
