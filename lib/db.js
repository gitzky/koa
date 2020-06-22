var Mysql = require("node-mysql-promise");
var config = require("../config");

var mysql = Mysql.createConnection({
	host: config.database.HOST,
	user: config.database.USERNAME,
	password: config.database.PASSWORD,
	database: config.database.DATABASE,
});

module.exports = function (table) {
	return mysql.table(table);
};
