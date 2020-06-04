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
    tel  VARCHAR(16)  NOT NULL DEFAULT '',
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

module.exports.query = query;
